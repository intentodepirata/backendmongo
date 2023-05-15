// importamos express y la función para validar email y password
const express = require("express");

const authSessionController = require("../controllers/authSessionController");
const chechBody = require("../middlewares/checkBody");

const authSessionRouter = express.Router();

authSessionRouter.post("/login", chechBody, authSessionController.login);

// Solicitud autenticada con sesión para obtener el perfil del usuario
authSessionRouter.get("/profile", authSessionController.profile);

module.exports = authSessionRouter;
