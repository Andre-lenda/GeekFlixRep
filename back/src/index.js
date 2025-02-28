import express from "express";
import cors from "cors";
import ROUTES from "./Rotas.js"

const SERVER = express()

SERVER.use(cors())
SERVER.use(express.json())
SERVER.use(ROUTES);

const SERVER_PORT = 4000;

SERVER.listen(SERVER_PORT, () =>
{
    console.log("FUNCIONANDO");
})