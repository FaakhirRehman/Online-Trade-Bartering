const express = require('express');
const { signup, signin } = require('../controllers/authentication');
const { validatesSignUpRequest, isRequestValidated, validatesSignInRequest } = require('../validators/validate');
const router = express.Router();

router.post('/signup', validatesSignUpRequest, isRequestValidated, signup);

router.post('/signin', validatesSignInRequest, isRequestValidated, signin);

module.exports = router;
