import userService from "../services/userService.js";

export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        const userCreated = await userService.signUp(name, email, password);

        if (user === null) {
            return res.sendStatus(422);
        }

        res.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

export async function signIn(req, res) {
    const { email, password } = req.body;

    const token = await userService.signIn(email, password);

    res.send({
        token,
    });

}