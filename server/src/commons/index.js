const jwt = require('jsonwebtoken');

exports.requireSignIn = (req, res, next) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } else {
        return res.status(400).json({
            message: "Authorization is Required"
        })
    }
}

exports.userMiddleWare = (req, res, next) => {
    next();
}

exports.adminMiddleWare = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message: "Admin Premission is Required"
        })
    }
    next();
}