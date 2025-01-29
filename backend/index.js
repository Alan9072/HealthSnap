import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCWFiJoaX6khmxMA5VK26k4lEhhYzVw6-I");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoint to handle POST requests
app.post('/chat', async (req, res) => {
  const productName = req.body.prompt;
  console.log(productName); // Extract the user prompt from the request body

  if (!productName) {
    return res.status(400).send('Prompt is required');
  }

  try {

        const prompt = `Please provide the details of the following product in the JSON format:
        Product Name: ${productName}
        
        {
          "product_name": "<Product Name>",
          "brand": "<Brand Name>",
          "category": "<Category>",
          "description": "<Description>"
          "ingredients": ["<Ingredient 1>", "<Ingredient 2>", "<Ingredient 3>", ...],
          "nutritional_info": 
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
          
        Please do not include any text or explanation, only return the JSON object.dont include the json beginning text and backticks.
        Also put up all the nutritional info and all the ingredients possible.
        Dont put any si units in the nutritional info.
        weight should not be in array format and be with si units ex :"available in w1g , w2g etc.. " Include etc as well.
        Category should be from these only "Snacks", "Sweets", "Beverages", "Dairy", "Ready-to-Eat", "Breakfast", "Bakery", "Frozen Foods", "Condiments", "Canned Goods", "Protein", "Cooking Essentials".
        IMP-The nutritional_info should be per 100g of the product.
        `;
    // Call the OpenAI API using the library
    const result = await model.generateContent(prompt);
    const rawResponse = result.response.text();
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

    // Send the API response back to the client
    res.json({
      reply:productData // Extract the generated response
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
