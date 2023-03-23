const bcrypt = require("bcrypt");
const createError = require("../utils/create-error");
// const {
//   validateRegister,
//   validateLogin,
// } = require("../validators/auth-validator");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // const value = validateRegister(req.body);
    const value = req.body;
    const user = await User.findOne({ where: { email: value.email } });
    if (user) {
      createError("Email is already in used");
    }
    value.password = await bcrypt.hash(value.password, 10);
    const result = await User.create(value);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // const value = validateLogin(req.body);
    const value = req.body;

    const user = await User.findOne({ where: { email: value.email } });
    if (!user) {
      createError("Invalid email or password", 400);
    }
    const canAccess = bcrypt.compare(value.password, user.password);
    if (!canAccess) {
      createError("Invalid email or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRED_IN,
      }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
