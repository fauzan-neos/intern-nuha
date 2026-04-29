const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    // const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(" ")[1];

    const token = req.cookies.token;


    // console.log("Auth Header:", authHeader); // Debugging line
    // console.log("Token:", token); // Debugging line

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;