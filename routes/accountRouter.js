const express = require("express");
const accountController = require("../controllers/accountController");
const accountRouter = express();

accountRouter.get("/:guid", accountController.getUser);

//crear una nueva cuenta
accountRouter.post("/", accountController.addUser);

//actualizar una cuenta
accountRouter.patch("/:guid", accountController.updateUser);

//elminar una cuenta
accountRouter.delete("/:guid", accountController.deleteUser);
module.exports = accountRouter;
