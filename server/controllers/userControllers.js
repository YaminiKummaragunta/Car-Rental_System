const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const roles = {
      user: 1,
      admin: 2,
    };

    const role = email === "admin123@gmail.com" ? 'admin' : 'user';

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(req.body);

    const UserDoc = new userModel({ name, email, password: hashedPassword, role });
    console.log("hash", hashedPassword)
    await UserDoc.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user!" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server not functioning");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    console.log("JWT token generated successfully", token);

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("Server error", err);
    res.status(500).json("Server not functioning");
  }
}

const tokenBlacklist = new Set();

const logoutUser =  (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token){
    tokenBlacklist.add(token);
    return res.status(200).json({ message: "Logged out successfully" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
      }
  }

  const validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (tokenBlacklist.has(token)){
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
    }


module.exports = { createUser, getAllUsers, loginUser, logoutUser, validateToken };