const { createUser } = require("../repositories/user.repository");
const { findUserByEmail } = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUserService(fullname, email, password) {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("Email already exists, log in instead");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    return await createUser(fullname, email, hashedPassword);
}

async function loginUserService(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    
    const token = jwt.sign({
        id : user.id,
        fullname: user.fullname,
        email : user.email,
        role : user.role || "user"
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN  
    })

    return {
        user, token
    }
}

module.exports = { createUserService, loginUserService };