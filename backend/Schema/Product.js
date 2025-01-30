import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    ingredients: { type: [String], default: [] },
    nutritional_info: {
      calories: { type: String },
      fat: { type: String },
      saturated_fat: { type: String },
      trans_fat: { type: String },
      carbohydrates: { type: String },
      sugar: { type: String },
      protein: { type: String },
      fiber: { type: String },
      cholesterol: { type: String },
      sodium: { type: String },
    },
    weight: { type: String },
    barcode: { type: String, required: true }
  });

  const Product = mongoose.model("Product", ProductSchema);
  export default Product;