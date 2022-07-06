import usersRepository from "../repositories/usersRepositories.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function signUp(name, email, password) {

    const existingUsers = await usersRepository.getUserByEmail(email);

    if (existingUsers.rowCount > 0) {
        return null;
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    return usersRepository.createUser(name, email, hashedPassword);
}

async function signIn(email, password) {

    if (!email || !password) {
        return null
    }

    const { rows } = await usersRepository.getUserByEmail(email);
    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return null;
    }

    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    );

    return token;
}

const userService = {
    signUp,
    signIn,
}


export default userService;