const { USERS_BBDD } = require("../bbdd.js");
const checkEmailPassword = require("../utils/checkEmailPassword.js");
const authController = {};

authController.public = (req, res) => {
  res.send("Endpoint público");
};

authController.autenticado = (req, res) => {
  try {
    // Llamamos a la función de validar el email y password
    const user = checkEmailPassword(email, password);
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(`Usuario ${user.name} autenticado`);
  } catch (err) {
    // Si el usuario no existe enviamos un 401 (unauthorized)
    return res.sendStatus(401);
  }
};

authController.autorizado = (req, res) => {
  try {
    // Llamamos a la función de validar el email y password
    const user = checkEmailPassword(email, password);
    // Si el rol del usuario no es administrador devolvemos un 403 (Forbidden)
    if (user.role !== "admin") return res.sendStatus(403);
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(`Usuario administrador ${user.name}`);
  } catch (err) {
    // Si el usuario no existe enviamos un 401 (unauthorized)
    return res.sendStatus(401);
  }
};
module.exports = authController;
