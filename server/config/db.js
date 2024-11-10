import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

const connectToDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB URI is not found");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error Connecting to DB", error);
    process.exit(1);
  }
};

export default connectToDB;
