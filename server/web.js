// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/router');
const { loginUser } = require('./controllers/UserController') // Adjust the path accordingly
 const {createUser} = require("./controllers/createUser")
 require('./db/conn');

const app = express();
const port = 3000;

dotenv.config();

// Express middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', router);
app.post('/api/loginUser', loginUser);
app.post('/api/createUser', createUser);

// ... other routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
