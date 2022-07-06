import jwt from "jsonwebtoken";
import financialEventsRepository from "../repositories/financialEventsRepositories.js";
import financialServices from "../services/financialServices.js";

export async function postFinancialEvents(req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.replace("Bearer ", "");
        const { value, type } = req.body;

        if (!token) {
            return res.sendStatus(401);
        }
        if (!value || !type) {
            return res.sendStatus(422);
        }
        if (value < 0) {
            return res.sendStatus(422);
        }

        const financialEvent = await financialServices.createFinancialEvent(token, value, type);

        if (financialEvent === null) {
            return res.sendStatus(422);
        }
        res.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }


}

export async function getFinancialEvents(req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.replace("Bearer ", "");

        if (!token) {
            return res.sendStatus(401);
        }

        let user;

        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.sendStatus(401);
        }

        const events = await financialEventsRepository.getFinancialEvents(user);

        res.send(events.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialEventsSum(req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.replace("Bearer ", "");

        if (!token) {
            return res.sendStatus(401);
        }

        const sum = await financialEventsRepository.getFinancialEventsSum(token);

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}