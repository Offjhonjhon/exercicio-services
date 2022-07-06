import connection from "../database.js";

async function createFinancialEvent(user, value, type) {
    return connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [user.id, value, type]
    );
}

async function getFinancialEvents(user) {
    return connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [user.id]
    );
}


const financialEventsRepository = {
    createFinancialEvent,
    getFinancialEvents
}

export default financialEventsRepository;