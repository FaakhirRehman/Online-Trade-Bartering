const express = require('express');
const { requireSignIn, adminMiddleWare } = require('../commons');
const { addCategory, fetchCategories, updateCategories, deleteCategories } = require('../controllers/category');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + "-" + file.originalname)
    }
});

const upload = multer({ storage });

router.post('/category/create', requireSignIn, adminMiddleWare, upload.single('categoryImage'), addCategory);

router.get('/category/fetch', fetchCategories);

router.post('/category/update', upload.array('categoryImage'), updateCategories);

router.post('/category/delete', deleteCategories);

module.exports = router;