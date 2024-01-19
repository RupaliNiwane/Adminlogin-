// UserController.js
const User = require('../modal/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let token;
    // Find the user by username
    const user = await User.findOne({ username });

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
        res.status(400).json({ error: "Invalid username or password" });
      }
    } else {
      const newUser = new User({ username, password });
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

module.exports = { loginUser };
