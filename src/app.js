import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import router from "./routers/index.js";
import "express-async-errors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

export default app;
