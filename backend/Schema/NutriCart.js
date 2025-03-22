import mongoose from "mongoose";

const NutriCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Linking to the User model
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Linking to the Product model
        required: true
      },
      addedAt: { type: Date, default: Date.now } // Timestamp of when added
    }
  ]
});

const NutriCart = mongoose.model("NutriCart", NutriCartSchema);
export default NutriCart;
