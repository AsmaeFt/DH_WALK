const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const dotenv = require("dotenv");
const createError = require("../utilitis/globalError");
dotenv.config();

const JWT_SECRET = "142secreToken";

exports.Register = async (req, res, next) => {
  try {
    const { username, fullname, email, password, role } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new createError("User Already exist ", 400));
    }
    const hasshedPassword = await bycrypt.hash(password, 123);
    const newUser = await User.create({
      ...req.body,
      password: hasshedPassword,
    });

    res.locals.message = "User created successfully";
    res.status(201).json({ message: res.locals.message });
  } catch (err) {
    next(err);
  }
};

exports.LogIn = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return next(new createError("User not Found", 400));
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!password) return next(new createError("Password is incorrect", 401));
    //JWT
    const token = jwt.sign(
      {
        id: user_id,
        role: user.role,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.locals.message = "Welcome Back";
    res.status(201).json({ message: res.locals.message });
  } catch (err) {
    next(err);
  }
};
