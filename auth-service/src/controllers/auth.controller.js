const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

// user create
exports.createUser = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (user) {
      return res
        .status(httpStatus.CONFLICT)
        .send({ error: "email  Already exists!!" });
    }
    const newUser = new userModel({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await newUser.save();
    return res.status(httpStatus.CREATED).json({ newUser, success: true });
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });

    const secret = process.env.secret;
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send("user not found!!");
    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          email: user.email,
          username: user.username,
        },
        secret,
        { expiresIn: "1d" }
      );

      return res.status(httpStatus.OK).send({ token: token });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send("Password is wrong!");
    }
  } catch (error) {
    next(error);
  }
};
