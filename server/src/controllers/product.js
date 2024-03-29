const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = (req, res) => {
    /* const {}  req.body;
    res.status(200).json({
        file: req.files,
        body: req.body
    });
    */

    const {
        name, price, description, category, quantity, createdBy
    } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product({
        name: req.body.name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save((error, product) => {
        if (error) {
            return res.status(400).json({
                error: error
            })
        }

        if (product) {
            res.status(200).json({
                product
            })
        }
    })

}

exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }

            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        if (error) {
                            return res.status(400).json({
                                error
                            })
                        }
                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productsByPrice: {
                                    under20k: products.filter(product => product.price <= 20000),
                                    under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                                    under40k: products.filter(product => product.price > 30000 && product.price <= 40000),
                                    under50k: products.filter(product => product.price > 40000 && product.price <= 50000),
                                    above50k: products.filter(product => product.price > 50000)
                                }
                            })
                        }
                        else {
                            return res.status(200).json({
                              products: [],
                            });
                        }
                
                    })
            }
            else {
                return res.status(200).json({
                  products: [],
                });
            }
        })
}

exports.getProductDetailsById = (req, res) => {
    // console.log('this is running');
    const { productId } = req.params;
    // console.log(productId)
    if (productId) {
        Product.findOne({ _id: productId })
            .exec((error, product) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                if (product) {
                    res.status(200).json({ product });
                }
            });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};