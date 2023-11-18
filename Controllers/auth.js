const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateUser = (req, res) => {
    try {
        const { login_id, password } = req.body;

        if (login_id === "test@sunbasedata.com" && password === "Test@123") {
            const token = jwt.sign({ login_id }, process.env.JWT_SECRET, { expiresIn: "2h" });

            return res.status(200).json({
                access_token: token,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to authenticate user",
        });
    }
};
