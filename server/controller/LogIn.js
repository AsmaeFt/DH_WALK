const User = require('../models/User');  // Ensure the path to your User model is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../utilitis/globalError')


const JWT_SECRET = process.env.JWT_SECRET ;
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

exports.Register = async (req, res, next) => {
  try {
    const { username, fullname, password, role } = req.body;

    const userExist = await User.findOne({ username });
    if (userExist) {
      return next(createError(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        username: newUser.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.LogIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return next(createError(400, "User not found"));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return next(createError(401, "Password is incorrect"));

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Welcome back",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
