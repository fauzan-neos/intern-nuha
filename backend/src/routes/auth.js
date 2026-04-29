const e = require('express');
const { createUserController, loginUserController } = require('../controllers/auth.controller');
var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/auth.middleware');

router.post('/register', createUserController);
router.post('/login', loginUserController);

router.get('/me', authMiddleware, (req, res) => {
    res.json({
        message: "Authenticated user",
        data: req.user
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false
    });
    res.json({ message: "Logged out successfully" });
});

module.exports = router;