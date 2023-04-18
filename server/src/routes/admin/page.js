const express = require('express');
const { upload, requireSignIn, adminMiddleWare } = require('../../commons');
const { createPage } = require('../../controllers/admin/page');
const router = express.Router();

router.post('/page/create', requireSignIn, adminMiddleWare, upload.fields([
    {
        name: 'banners'
    },
    {
        name: 'products'
    }
]), createPage)

module.exports = router;