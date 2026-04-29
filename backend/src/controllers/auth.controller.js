const { path } = require("../../app");
const { createUserService, loginUserService } = require("../services/auth.service");
const { createUserSchema, loginUserSchema } = require("../validators/auth.validator");  

async function createUserController(req, res) {
    const validation = createUserSchema.safeParse(req.body);

    if(!validation.success) {
        return res.status(400).json({
            message: validation.error.issues[0].message
        });
    }

    const { fullname, email, password } = validation.data;

    try {
        const userId = await createUserService(fullname, email, password);
        res.json({
            message: "User created successfully, please log in",
            data: { id: userId, fullname: fullname, email: email }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function loginUserController(req, res) {
    const validation = loginUserSchema.safeParse(req.body);

    if(!validation.success) {
        return res.status(400).json({
            message: validation.error.errors[0].message
        });
    }

    const { email, password } = validation.data;
    
    try {
        const { user, token } = await loginUserService(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });

        console.log("TOKEN:", token);

        return res.json({
            message: "Login successful",
            data: { id: user.id, fullname: user.fullname, email: user.email }
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = { createUserController, loginUserController };