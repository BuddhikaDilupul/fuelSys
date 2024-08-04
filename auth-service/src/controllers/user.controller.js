const httpStatus = require("http-status");
const userModel = require("../models/user.model");

// Get user data by email
exports.getUserDataByEmail = async (req, res, next) => {
  try {
    const user = await userModel.findOne(
      { email: req.params.email },
      "_id name username email phoneNumber role status"
    );

    if (user) {
      let userData = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        status: user.status,
      };
      return res.status(httpStatus.OK).send(userData);
    }

    return res.status(httpStatus.NOT_FOUND).send("User not found");
  } catch (error) {
    next(error);
  }
};

// Get all users
exports.getAll = async (req, res, next) => {
  try {
    const users = await userModel.find(
      {},
      "_id name username email phoneNumber role status"
    );

    if (users && users.length > 0) {
      return res.status(httpStatus.OK).send(users);
    }

    return res.status(httpStatus.NOT_FOUND).send("Users not found");
  } catch (error) {
    next(error);
  }
};
// Get all Managers
exports.getAllManagers = async (req, res, next) => {
  try {
    const users = await userModel.find(
      { role: "MANAGER" },
      "_id name username email phoneNumber role status"
    );

    if (users && users.length > 0) {
      return res.status(httpStatus.OK).send(users);
    }

    return res.status(httpStatus.NOT_FOUND).send("Users not found");
  } catch (error) {
    next(error);
  }
};

// Get all getAllPumpers
exports.getAllPumpers = async (req, res, next) => {
  try {
    const users = await userModel.find(
      { role: "PUMPER" },
      "_id name username email phoneNumber role status"
    );

    if (users && users.length > 0) {
      return res.status(httpStatus.OK).send(users);
    }

    return res.status(httpStatus.NOT_FOUND).send("Users not found");
  } catch (error) {
    next(error);
  }
};

// Update user data
exports.updateUserData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(httpStatus.NOT_FOUND).send("User not found");
    }

    return res.status(httpStatus.OK).send(updatedUser);
  } catch (error) {
    next(error);
  }
};
