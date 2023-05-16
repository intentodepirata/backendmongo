const checkEmailPassword = require("../utils/checkEmailPassword.js");
const authController = {};

authController.public = (req, res) => {
  res.send("Endpoint público");
};

authController.autenticado = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Llamamos a la función de validar el email y password
    const user = await checkEmailPassword(email, password);
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send(`Usuario ${user.name} autenticado`);
  } catch (err) {
    // Si el usuario no existe enviamos un 401 (unauthorized)
    return res.sendStatus(401);
  }
};

authController.autorizado = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Llamamos a la función de validar el email y password
    const user = await checkEmailPassword(email, password);
    console.log(user);
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
