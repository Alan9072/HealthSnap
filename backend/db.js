import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NODE_ENV == "development" ? "mongodb://127.0.0.1:27017/healthsnap" : process.env.MONGO_URI  ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export { connectDB };  // ✅ Exporting the function as a module
