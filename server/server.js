import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}/`)
);
