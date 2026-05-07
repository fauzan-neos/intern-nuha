const prisma = require("../config/prisma");

async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: {email: email}
    });
}

async function createUser(fullname, email, password) {
    const newUser = await prisma.user.create({
        data: {
            fullname: fullname,
            email: email,
            password: password,
            role: "USER"
        }
    });
    return newUser.id
}

module.exports = {findUserByEmail, createUser};