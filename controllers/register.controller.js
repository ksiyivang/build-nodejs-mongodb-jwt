

const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require("../middleware/validation");


exports.register = async (req, res) => {
    // Let's Validate  
    const { name, email, password } = req.body
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email is aready exist!!");

    // HASH password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    // create a new user
    const user = new User({
        name: name,
        email: email,
        password: hashPassword
    });


    try {
        const savedUser = await user.save();
        // res.send(savedUser);
        res.send({ user: user._id })

    } catch (error) {
        res.status(400).send(error)
    }



}

// Login

exports.login = async (req, res) => {
    // res.send('Login')

    // LETS Validate the data before we a user
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the email is already in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email isn't found");

    // password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password")

    res.send('Logined In')
}

