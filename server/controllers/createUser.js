// UserController.js
const createUserModel = require("../modal/createUserSchema"); // Rename create to createUserModel
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
//   const { email, password } = req.body;
  const email = req.body.email;
  const  password =req.body.password;

  try {
    let token;
    // Find the user by email
    const user = await createUserModel.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Sign the JWT token with the secret key
        token = await user.generateAuthToken();
        console.log(token);

        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });

        res.json({ message: "User Sign successful" });
      } else {
        res.status(400).json({ error: "Invalid email or password" });
      }
    } else {
      const newUser = new createUserModel({ email, password });
      await newUser.save();

      // Sign the JWT token for the new user
      token = await newUser.generateAuthToken();
      console.log(token);

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });

      res.json({ message: "User Sign successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { createUser };