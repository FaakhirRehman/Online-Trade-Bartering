const express = require('express');
const { initialData } = require('../../controllers/admin/initialData');
const { upload, requireSignIn, adminMiddleWare } = require('../../commons');
const router = express.Router();

router.post('/initialdata', requireSignIn, adminMiddleWare, initialData);

module.exports = router;