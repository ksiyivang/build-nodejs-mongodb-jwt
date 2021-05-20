
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

dotenv.config();
// Connnect to DB

mongoose.connect(process.env.DB_CONNECT, () => {
    console.log('connect to db')
})

// Import Routes
const authRoute = require("./routes/auth");


// Middleware
app.use(express.json());

// Routes Midlleware

app.use('/api/user', authRoute);



app.listen(4000, () => console.log('Server up and running on Port 4000'));