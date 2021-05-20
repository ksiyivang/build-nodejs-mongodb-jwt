
const express = require('express');

const app = express();
const mongoose = require('mongoose');

// Connnect to DB

mongoose.connect(`mongodb+srv://node-api-jwt:J7ugbU0JDmne9Ttj@cluster0.qiuoe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, () => {
    console.log('connect to db')
})

// Import Routes
const authRoute = require("./routes/auth");


app.use('/api/user', authRoute);



app.listen(4000, () => console.log('Server up and running on Port 4000'));