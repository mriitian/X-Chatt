import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

const chatSchema = mongoose.Schema(
  {
    members: Array,
  },
  {
    timeStamps: true,
  }
);

const router = express.Router();

const createToken = (id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ id }, jwtKey, { expiresIn: "3d" });
};

// Route to handle user registration
router.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json("User already exist");
    }

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("Email is not valid");
    }

    user = new userModel({ name, password, email });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user.id);
    res.status(200).json({ id: user.id, name, email, token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json("User does not exist");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    res.status(400).json("Incorrect Password");
  }

  const token = createToken(user.id);
  res.status(200).json({ id: user.id, name: user.name, email, token });

  try {
  } catch (error) {
    console.log(error);
  }
});

// const findUser = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const user = userModel.findById(userId);
//   } catch (error) {
//     console.log(error);
//   }
// };

router.get("/find/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId); // Await the query
    res.status(200).json(user); // Send the user object as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find(); // Await the query
    res.status(200).json(users); // Send the user object as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors
  }
});

export default router;
