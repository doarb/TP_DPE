const User = require("../models/users");
const config = require("../config/index").config;
const debugUser = require("debug")(config.name + ":services:users");
const bcrypt = require("bcrypt");

const getUser = async (email) => {
  if (!email) {
    debugUser("No email provided");
    return undefined;
  }

  try {
    return User.findOne({ email: email });
  } catch (error) {
    debugUser("Error while getting user", error);
    return undefined;
  }
};

const createUser = async (user) => {
  if (!user.name || !user.email || !user.password) {
    return Promise.reject(new Error("Missing required fields"));
  }

  //vérifie que le user n'exite pas dans la base
  const userExist = await getUser(user.email);
  if (userExist) {
    debugUser("User already exist");
    return undefined;
  }

  try {
    const hashedPassword = await hashPassword(user.password);
    if (!hashedPassword) {
      debugUser("Error while hashing password");
      return Promise.reject(new Error("Error while hashing password"));
    }
    user.password = hashedPassword;
    return User.create(user);
  } catch (error) {
    debug("Error while creating user", error);
    return Promise.reject(new Error("Error while creating user"));
  }
};

const authenticate = async (email, password) => {
  try {
    debugUser("comparePassword");
    debugUser("email " + email);
    const user = await User.findOne({ email: email });

    if (!user) {
      debugUser("user not found");
      return Promise.reject(new Error("User not found"));
    }

    debugUser("user found");

    // Use bcrypt to compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      debugUser("password incorrect");
      return Promise.reject(new Error("Password incorrect"));
    }

    debugUser("password correct");
    debugUser("user comparePassword end");
    return user;
  } catch (error) {
    // Log or handle the error as needed
    console.error(error);
    return undefined;
  }
};

async function hashPassword(password) {
  const saltRounds = 16;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

module.exports = {
  getUser,
  createUser,
  authenticate,
};
