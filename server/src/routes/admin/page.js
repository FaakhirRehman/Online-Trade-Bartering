const express = require('express');
const { upload, requireSignIn, adminMiddleWare } = require('../../commons');
const { createPage, getPage } = require('../../controllers/admin/page');
const router = express.Router();

router.post('/page/create', requireSignIn, adminMiddleWare, upload.fields([
    {
        name: 'banners'
    },
    {
        name: 'products'
    }
]), createPage)

router.get('/page/:category/:type', getPage);

module.exports = router;