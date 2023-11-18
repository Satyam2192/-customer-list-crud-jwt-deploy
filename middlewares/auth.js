const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        if (process.env.NODE_ENV === 'test') {
            // for testing Skip authentication
            return next();
        }

        
        const token = req.cookies.token || req.header("Authorization").replace("Bearer", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
