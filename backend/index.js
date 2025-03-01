import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { connectDB } from "./db.js";
import Product from "./Schema/Product.js";
import multer from "multer";
import History from "./Schema/History.js";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import User from "./Schema/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken.js";
import moment from "moment";

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const Ai = process.env.GEN_AI;
const genAI = new GoogleGenerativeAI(Ai);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const port = process.env.PORT || 3000;

const frontendURL = process.env.FRONTEND_URL;
const isProduction = process.env.NODE_ENV === "production";

app.use(cors({
  origin: frontendURL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

connectDB(); // Connect to the MongoDB database

const upload = multer({ storage: multer.memoryStorage() });

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString()
);

const client = new ImageAnnotatorClient({ credentials });

const generateAuthToken = (user) => {
  const payload = {
    userId: user._id, // You can include additional data in the payload if needed
  };

  // Sign the JWT with a secret key (make sure to keep this key safe and private)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }); // Expires in 1 hour
};


// Endpoint to handle POST requests
app.get("/products/:id", async (req, res) => {
  const barcode = req.params.id;

  console.log("Barcode:", barcode);

  try {
    const product = await Product.findOne({ barcode: barcode });

    if (product) {
      console.log("Product found in the database");
      res.json(product);
    } else {
      console.log("Product not found in the database");
      res.json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).send("Error fetching product from the database");
  }
});

app.post("/chat", async (req, res) => {
  console.log(req.body); // Log the entire body to see if it arrives correctly

  const productName = req.body.prompt; // This should work
  const barcode = req.body.barcode; // This should work

  console.log("Barcode:", barcode); // Log barcode to check its value
  console.log("Product Name:", productName);

  if (!productName) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const prompt = `Please provide the details of the following product in the JSON format:
        Product Name: ${productName}
        
        {
          "product_name": "<Product Name>",
          "brand": "<Brand Name>",
          "category": "<Category>",
          "description": "<Description>"
          "ingredients": ["<Ingredient 1>", "<Ingredient 2>", "<Ingredient 3>", ... all possible ingredients  - means put all falvouring , acidity regulators and more .],
          "nutritional_info_per100g": 
          {
            "calories": "<Calories>",
            "fat": "<Fat>",
            "saturated_fat": "<Saturated Fat>",
            "trans_fat":"<Trans Fat>",
            "carbohydrates": "<Carbohydrates>",
            "sugar": "<Sugar>",
            "protein": "<Protein>",
            "fiber": "<Fiber>",
            "cholesterol": "<Cholesterol>",
            "sodium": "<Sodium>",
          }
          "weight": "<Show the weights available in the market>"
        }
        IMP-The nutritional_info_per100g should be PER 100G OF PRODUCT.
        Please do not include any text or explanation, only return the JSON object.dont include the json beginning text and backticks.
        Also put up all the nutritional info and all the ingredients possible - means put all falvouring , acidity regulators and more .
        Dont put any si units in the nutritional info.
        weight should not be in array format and be with si units ex :"available in w1g , w2g etc.. " Include etc as well.
        Category should be from these only "Snacks","Spreads", "Sweets", "Beverages", "Dairy", "Ready-to-Eat", "Breakfast", "Bakery", "Frozen Foods", "Condiments", "Canned Goods", "Protein", "Cooking Essentials","Others".
        
        `;
    // Call the OpenAI API using the library
    const result = await model.generateContent(prompt);
    let rawResponse = result.response.text();
    rawResponse = rawResponse.replace(/```json|```/g, "").trim();
    // console.log("Raw response:", rawResponse);
    let productData = null;
    //////////////////////////////////////////////////////////////////////
    try {
      // Try parsing the response as JSON
      productData = JSON.parse(rawResponse);

      // Now you have the product details in productData
      console.log(productData);
    } catch (error) {
      console.error("Error parsing product details:", error);
    }

    //////////////////////////////////////////////////////////////////////
    productData.accuracy = 70; // Add the accuracy to the product data
    productData.barcode = barcode;
    const newProduct = new Product(productData);
    await newProduct.save();
    console.log("Product saved to the database");

    // Send the API response back to the client
    res.json({
      reply: productData, // Extract the generated response
    });
  } catch (error) {
    console.error("Error interacting with AI:", error);
    res.status(500).send("Error interacting with the AI API");
  }
});


app.post("/detect", upload.fields([{ name: "nutriImage" }, { name: "ingredImage" }]),async (req, res) => {
  console.log("Request received at /detect!");

  const realBarcode = req.body.barcode;
  console.log("Barcode:", realBarcode);

  console.log("Files:", req.files);  // Log uploaded files

  if (!req.files || !req.files.nutriImage || !req.files.ingredImage) {
    return res.status(400).json({ error: "Files not received!" });
  }
  // do the OCR processing here

  try {
    // Perform text detection on nutriImage
    const [nutriResult] = await client.textDetection(req.files.nutriImage[0].buffer);
    const nutriDetections = nutriResult.textAnnotations;

    // Perform text detection on ingredImage
    const [ingredResult] = await client.textDetection(req.files.ingredImage[0].buffer);
    const ingredDetections = ingredResult.textAnnotations;

    // If text was detected in both images
    if (nutriDetections.length > 0 && ingredDetections.length > 0) {
      let nutriText = nutriDetections[0].description;
      let ingredText = ingredDetections[0].description;

      console.log("Text from Nutri Image:", nutriText);
      console.log("Text from Ingredients Image:", ingredText);

      // Generate the prompt for AI model using both texts
      
      const nutriPrompt =  `Nutri Text : ${nutriText} 
      
      convert this into JSON of 
      // Every field should have a numeric value. If the value is not present, use 0.
      {
        "nutritional_info_per100g": {
          "calories": "<Calories>",
          "fat": "<Fat>",
          "saturated_fat": "<Saturated Fat>",
          "trans_fat": "<Trans Fat>",
          "carbohydrates": "<Carbohydrates>",
          "sugar": "<Sugar>",
          "protein": "<Protein>",
          "fiber": "<Fiber>",
          "cholesterol": "<Cholesterol>",
          "sodium": "<Sodium>"
        }
      }
      
      // only fill numeric values with no si unts in case of nutritional info.
      // It should be per 100g of the product.
      Return JSON only.`;

      const ingredPrompt = `Ingred Text : ${ingredText}

      convert this into JSON of
      {
        "ingredients": ["<Ingredient 1>", "<Ingredient 2>", "<Ingredient 3>", ... all possible ingredients  - means put all falvouring , acidity regulators and more .]
      }
      // only return the JSON object. dont include the json beginning text and backticks.`;

      // Generate content with AI model
      const nutriResult = await model.generateContent(nutriPrompt);
      const ingredResult = await model.generateContent(ingredPrompt);
      let rawnutriResponse = nutriResult.response.text();
      let rawingredResponse = ingredResult.response.text();

      rawnutriResponse = rawnutriResponse.replace(/```json|```/g, "").trim();
      rawingredResponse = rawingredResponse.replace(/```json|```/g, "").trim();

      console.log("Raw response from Nutri Image:", rawnutriResponse);
      console.log("Raw response from Ingredients Image:", rawingredResponse);

      
      let realNutriData = null;
      let realIngredData = null;
      try {
        // Try parsing the response as JSON
        realNutriData = JSON.parse(rawnutriResponse);
        realIngredData = JSON.parse(rawingredResponse);
        console.log("Parsed JSON of Nutri Data:", realNutriData);
        console.log("Parsed JSON of Ingred Data:", realIngredData);

      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      if(realNutriData && realIngredData){
        try {
          const product = await Product.findOne({ barcode: realBarcode });
      
          if (product) {
            product.nutritional_info_per100g = realNutriData.nutritional_info_per100g;
            product.ingredients = realIngredData.ingredients;
            product.accuracy = 90;

            await product.save();
            console.log("Product updated in the database");

            res.json({
              message: "Product updated successfully",
              product: product
            });
          } else {
            console.log("Product not found in the database");
            res.json({ message: "Product not found" });
          }
        } catch (error) {
          console.error("Error fetching product:", error);
      
          res.status(500).send("Error fetching product from the database");
        }
      }else{
        return res.status(404);
      }

    } else {
      res.status(404).send('No text detected in one or both images.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the images or AI generation.');
  }
});


app.post("/register", async (req, res) => {
  try {
    const { username, password, name, ...otherDetails } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists!");
      return res.json({ message: "Username already exists!" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create and save new user
    const newUser = new User({
      username,
      password:hashedPassword,
      name,
      ...otherDetails, // Save other fields like age, height, etc.
    });

    await newUser.save();
    res.json({ message: "verified" }); // Success Response
  } catch (error) {
    console.error("Error Registering User:", error);
    res.json({ message: "Server Error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "User not found!" });
    }

    // Compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid Username or Password!" });
    }

    // If password matches, you can generate a JWT and send it
    const token = generateAuthToken(user); // Implement JWT token generation
    res.cookie("token", token, {
      httpOnly: isProduction,  // Prevents client-side access
      secure: isProduction, // Secure in production (HTTPS only)
      sameSite: "None", // Helps prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });
    
    console.log("token", token);

    res.json({ message: "Login successful", token }); // Respond with token
  } catch (error) {
    console.error("Error Logging in:", error);
    res.json({ message: "Server Error" });
  }
});

app.get("/me", verifyToken, async (req, res) => {
  console.log("✅ Received request at /me");
  try {
    console.log("User ID:", req.user.userId); // ✅ Debugging line
    const userData = await User.findById(req.user.userId); // Use decoded userId
    res.json({ me: userData });
  } catch (error) {
    console.log("Error finding user");
    res.json({ message: "User not found" });
  }
});

app.put("/update-user", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });
    if (!updatedUser) return res.json({ message: "User not found" });

    res.json({ updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.json({ message: "Failed to update user data" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: isProduction,
    secure: isProduction, // Only send over HTTPS
    sameSite: "None",
    expires: new Date(0), // Expire the cookie immediately
  });

  res.json({ message: "Logged out successfully" });
});

app.post("/history", verifyToken, async (req, res) => {
  try {
    console.log("Reached history route");

    const userId = req.user.userId; // Extracted from JWT in cookies
    const { product } = req.body; // Barcode is received
    console.log("Scanned Barcode:", product);

    // Check if the product exists in the database
    const productData = await Product.findOne({ barcode: product });

    if (!productData) {
      return res.json({ message: "Product not found in database" });
    }

    const productId = productData._id;

    // Check if history entry already exists for this user & product
    const existingHistory = await History.findOne({ user: userId, product: productId });

    if (existingHistory) {
      console.log("Product already exists in history. Deleting...");
      await History.deleteOne({ user: userId, product: productId }); // Deletes only that product
    }

    // create a new history entry
    const newHistory = new History({ user: userId, product: productId });
    await newHistory.save();

    res.json({ message: "History updated successfully!" });
  } catch (error) {
    console.error("Error saving history:", error);
    res.json({ message: "Internal server error" });
  }
});

app.get("/history", verifyToken, async (req, res) => {
  console.log("gotcha");
  // try {
  //   console.log("Fetching history...");

  //   const userId = req.user.userId; // Extract user ID from JWT

  //   // Find user's history, sort by latest first, and get product details
  //   const history = await History.find({ user: userId })
  //     .populate("product") // Get product details
  //     .sort({ timestamp: -1 }); // Sort by latest first

  //   // If no history is found, send a message
  //   if (history.length === 0) {
  //     return res.json({ message: "No history found" });
  //   }

  //   // Group history by date (DD-MM-YY format)
  //   const groupedHistory = {};
    
  //   history.forEach((entry) => {
  //     const date = moment(entry.timestamp).format("DD-MM-YY"); // Format: DD-MM-YY
  //     if (!groupedHistory[date]) {
  //       groupedHistory[date] = [];
  //     }
  //     groupedHistory[date].push(entry);
  //   });

  //   // Send grouped history
  //   console.log("Grouped History:", groupedHistory);
  //   res.json({ history: groupedHistory });
  // } catch (error) {
  //   console.error("Error fetching history:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running correctly on port :${port}`);
});
