const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    try {
        User.findOne({ userId: req.headers.userid })
            .then(user => {
                console.log("user", user)
                if (user.status == 0) {
                    return res.status(200).json({
                        message: "User has been blocked.",
                        status: false,
                        code: "USER_BLOCKED"
                    });
                } else {
                    try {
                        const token = req.headers.authorization.split(" ")[1];
                        console.log("process.env.JWT_KEY", process.env.JWT_KEY)
                        const decoded = jwt.verify(token, process.env.JWT_KEY || "secretsrc");
                        req.userData = decoded;
                        next();
                    } catch (error) {
                        return res.status(200).json({
                            status: false,
                            message: 'Auth failed'
                        });
                    }
                }
            })
    } catch (error) {
        return res.status(200).json({
            status: false,
            message: 'Auth failed'
        });
    }
};