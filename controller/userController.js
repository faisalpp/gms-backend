const User = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;
// login user
const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // const hashedPassword = await bcrypt.hashSync(password, saltRounds);
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (passwordMatch) {
        return res
          .status(200)
          .json({ success: "Login successfully", user: existingUser });
      } else {
        return res.status(200).json({ error: "Invalid Password" });
      }
    } else {
      return res.status(200).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(200).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// add user
const addUser = async (req, res) => {
  let userId = Math.random().toString(36).slice(2);
  try {
    const email = req.body.email;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(200)
        .json({ error: "An account with the provided email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newuser = new User({
      userId: userId,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      phone_no: req.body.phone_no,
      isLoggedIn: 0,
    });
    await newuser.save();
    return res.status(200).json({ success: "User added successfully" });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update User

// Update Vehicle
const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    // Check if the password is empty and remove it if so
    if (password === "") {
      delete updateData.password;
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPassword;
    }

    await User.findByIdAndUpdate(req.body._id, updateData);
    return res.status(200).json({ success: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    console.log(req.body.id);
    await User.findByIdAndDelete(req.body.id);
    return res.status(200).json({ success: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all users
const users = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: 1 });
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addUser, updateUser, users, deleteUser, loginUser, getUser };
