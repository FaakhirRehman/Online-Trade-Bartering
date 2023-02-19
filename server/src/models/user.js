const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    username: {
        type: String,
        required: true,
        min: 1,
        max: 50,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    hashed_password: {
        type: String,
        required: true,
        min: 7
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 5
    },
    city: {
        type: String,
        required: true
    },
    address01: {
        type: String,
        required: true
    },
    address02: {
        type: String,
    },
    postalCode: {
        type: String,
        required: true
    },
    profilePicture: { 
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

userSchema.virtual('password')
    .set(function(password){
        this.hashed_password = bcrypt.hashSync(password, 10);
})

userSchema.virtual('fullname').get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: function(password){
        console.log(password);
        return bcrypt.compareSync(password, this.hashed_password);
    }
}

module.exports = mongoose.model('USER', userSchema)