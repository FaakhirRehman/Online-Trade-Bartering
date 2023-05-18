const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
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
    categoryImage: {
        type: String
    },
    type: {
        type: String
    },
    parentId: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('CATEGORY', categorySchema)