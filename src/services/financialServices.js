import financialEventsRepository from "../repositories/financialEventsRepositories.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function createFinancialEvent(token, value, type) {

    const financialTypes = ["INCOME", "OUTCOME"];
    if (!financialTypes.includes(type)) {
        return null;
    }

    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }

    return financialEventsRepository.createFinancialEvent(user, value, type);
}

async function getFinancialEvents(token) {
    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return res.sendStatus(401);
    }

    return await financialEventsRepository.getFinancialEvents(user);

}

async function getFinancialEventsSum(email, password) {

    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }

    const events = await financialEventsRepository.getFinancialEvents(user);

    return events.rows.reduce(
        (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
        0
    );
}

const financialServices = {
    createFinancialEvent,
    getFinancialEvents,
    getFinancialEventsSum
}


export default financialServices;