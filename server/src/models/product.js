const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity:{
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    productPictures: [
        { img: { type: String }}
    ],
    reviews: [
        { 
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
            review: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'CATEGORY',
        required: true
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId, ref: 'USER',
        required: true
    },
    updatedAt: Date

}, { timestamps: true })

module.exports = mongoose.model('PRODUCT', productSchema)