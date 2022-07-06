import { Router } from "express";
import { postFinancialEvents, getFinancialEvents, getFinancialEventsSum } from "../controllers/financialEventsController.js";

const financialRouter = Router();

financialRouter.post("/financial-events", postFinancialEvents);
financialRouter.get("/financial-events", getFinancialEvents);
financialRouter.get("/financial-events/sum", getFinancialEventsSum);

export default financialRouter;