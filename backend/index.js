import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

// Enable CORS for frontend
app.use(cors());


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
