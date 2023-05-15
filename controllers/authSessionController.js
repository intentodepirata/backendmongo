const checkEmailPassword = require("../utils/checkEmailPassword");

const authSessionController = {};
const { v4: uuidv4 } = require("uuid");
const sessions = [];

authSessionController.login = (req, res) => {
  // Obtenemos el email y password del body
  const { email, password } = req.body;
  // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
  if (!email || !password) return res.sendStatus(400);

  try {
    // Validamos el email y password y obtenemos el guid para asociarlo con la sesión
    const { guid, name } = checkEmailPassword(email, password);

    const sessionId = uuidv4();
    // Añadimos el sessionId al array
    sessions.push({ sessionId, guid });

    return (
      res
        // Escribimos en la cookie el sessionId con la opción httpOnly
        .cookie("sessionId", sessionId, { httpOnly: true })
        //Si todo es correcto enviamos la respuesta. 200 OK
        .send(`Usuario ${name} autenticado`)
    );
  } catch (err) {
    // Si el usuario no existe enviamos un 401 (unauthorized)
    return res.sendStatus(401);
  }
};

authSessionController.profile = (req, res) => {
  // obtenemos la cookie que recibimos
  const { cookies } = req;
  // Si la cookie no existe enviamos un 401 (unauthorized)
  if (!cookies.sessionId) return res.sendStatus(401);
  // Buscamos la sesión recibida en el array de sesiones
  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId
  );
  // Si no existe enviamos un 401 (unauthorized)
  if (!userSession) return res.sendStatus(401);
  // Obtenemos los datos del usuario a través de guid
  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);
  // Si no obtenemos usuario enviamos un  401 (unauthorized)
  if (!user) return res.sendStatus(401);
  // Borramos la password del objeto obtenido para no mostrarla
  delete user.password;
  // Y devolvemos los datos del usuario
  return res.send(user);
};

module.exports = authSessionController;
