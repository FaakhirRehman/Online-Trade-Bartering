const express = require('express');
const { requireSignIn } = require('../../commons');
const { signup, signin, signout } = require('../../controllers/admin/authentication');
const { validatesSignUpRequest, isRequestValidated, validatesSignInRequest } = require('../../validators/validate');
const router = express.Router();

router.post('/admin/signup', validatesSignUpRequest, isRequestValidated, signup);

router.post('/admin/signin', validatesSignInRequest, isRequestValidated, signin);

router.post('/admin/signout', signout);

module.exports = router;
