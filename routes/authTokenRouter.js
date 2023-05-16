const express = require("express");
const checkBody = require("../middlewares/checkBody");
const validateLoginDto = require("../middlewares/validateLoginDto.js");

// Login con email y password generando un token

const authTokenController = require("../controllers/authTokenController");
const authTokenRouter = express.Router();
require("dotenv").config();

// Login con email y password
authTokenRouter.post("/login", validateLoginDto, authTokenController.login);

// Solicitud autenticada para obtener el perfil del usuario
authTokenRouter.get("/profile", authTokenController.profile);

module.exports = authTokenRouter;
