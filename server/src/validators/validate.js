const { check, validationResult } = require('express-validator');

exports.validatesSignUpRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First Name is Required'),
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is Required'),
    check('username')
    .notEmpty()
    .withMessage('Username is required'),
    check('email')
    .isEmail()
    .withMessage('A valid email is required'),
    check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be atleast 7 characters long'),
    check('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required'),
    check('city')
    .notEmpty()
    .withMessage('City name is required'),
    check('address01')
    .notEmpty()
    .withMessage('Primary Address is required'),
    check('postalCode')
    .notEmpty()
    .withMessage('Postal Code is required')
] 

exports.validatesSignInRequest = [
    check('email')
    .isEmail()
    .withMessage('E-mail is required'),
    check('password')
    .isLength({ min: 5 })
    .withMessage('Password is required')
] 

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            errors: errors.array()[0].msg
        })
    }
    next();
}