const express = require("express");
const accountController = require("../controllers/accountController");
const validateRegisterDto = require("../middlewares/validateRegisterDto");
const validateLoginDto = require("../middlewares/validateLoginDto");

const accountRouter = express();

accountRouter.get("/:guid", accountController.getUser);

//crear una nueva cuenta
accountRouter.post("/", validateRegisterDto, accountController.addUser);

//actualizar una cuenta
accountRouter.patch("/:guid", accountController.updateUser);

//elminar una cuenta
accountRouter.delete("/:guid", accountController.deleteUser);
module.exports = accountRouter;
