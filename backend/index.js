import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "./db.js";
import Product from "./Schema/Product.js";

const genAI = new GoogleGenerativeAI("AIzaSyCWFiJoaX6khmxMA5VK26k4lEhhYzVw6-I");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB(); // Connect to the MongoDB database

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
