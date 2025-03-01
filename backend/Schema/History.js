import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model("History", HistorySchema);
export default History;
