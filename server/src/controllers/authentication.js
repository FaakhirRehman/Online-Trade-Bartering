const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user){
            return res.json({
                message: "E-mail Already In Use!"
            })
        }

        const {
            firstName,
            lastName,
            username,
            email,
            password,
            phoneNumber,
            city,
            address01,
            address02,
            postalCode
        } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            phoneNumber,
            city,
            address01,
            address02,
            postalCode,
            role: 'user'
        });

        newUser.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: "Something Went Wrong. Pleaes Try Again",
                    error: `${error}`
                });
            }
            else if(data){
                return res.status(201).json({
                    message: "User Created Successfully!"
                })
            }
        });
    });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) {
            return res.status(400).json({
                error
            })
        }
        if(user) {
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' })
                const { _id, firstName, lastName, email, role, fullname } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullname
                    }
                });
            } else {
                return res.status(400).json({
                    message: 'Password Invalid'
                })
            }
        }
    });
}