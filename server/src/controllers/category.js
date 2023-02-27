const slugify = require('slugify');
const Category = require('../models/category');

function createCategories(categories, parentId = null){
    const categoryList = [];
    let category;

    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined); 
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    // recurssive function for creating sub categories
    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        })
    }

    return categoryList;
}

exports.addCategory = (req, res, next) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
        //section: req.body.section
    }

    if(req.file){
        categoryObj.categoryImage = process.env.APPLICATION_API + '/public/' + req.file.filename; 

    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const cate = new Category(categoryObj);
    cate.save((error, category) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }

        if (category) {
            return res.status(201).json({
                category
            })
        }
    })
}

exports.fetchCategories = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        };

        if (categories) {

            const categoryList = createCategories(categories);

            res.status(200).json({
                categoryList
            })
        }
    });
}