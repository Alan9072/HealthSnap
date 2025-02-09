import express from "express";
import cors from "cors";
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { connectDB } from "./db.js";
import Product from "./Schema/Product.js";
import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const genAI = new GoogleGenerativeAI("AIzaSyCWFiJoaX6khmxMA5VK26k4lEhhYzVw6-I");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB(); // Connect to the MongoDB database

const upload = multer({ storage: multer.memoryStorage() });

const client = new ImageAnnotatorClient({
  keyFilename: path.join(__dirname, './service/service.json') // Replace with your actual path
});

// Endpoint to handle POST requests
app.get("/products/:id", async (req, res) => {
  const barcode = req.params.id;

  console.log("Barcode:", barcode);

  try {
    const product = await Product.findOne({ barcode: barcode });

    if (product) {
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



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
