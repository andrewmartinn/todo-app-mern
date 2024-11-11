import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const createToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(foundUser._id, foundUser.username);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Failed to login user: ", error);
    res.status(500).json({ success: false, message: "Failed to login user" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id, newUser.username);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Failed to register user: ", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
};

export { loginUser, registerUser };
