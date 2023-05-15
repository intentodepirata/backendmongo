const express = require("express");
const authController = require("../controllers/authController");
const chechBody = require("../middlewares/checkBody");
const authRouter = express.Router();

// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", authController.public);

// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", chechBody, authController.autenticado);

// Endpoint autorizado a administradores
authRouter.post("/autorizado", authController.autorizado);

module.exports = authRouter;
