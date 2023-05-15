const authTokenController = {};
const checkEmailPassword = require("../utils/checkEmailPassword");
const { SignJWT, jwtVerify } = require("jose");
const { USERS_BBDD } = require("../bbdd");

authTokenController.login = async (req, res) => {
  // Obtenemos el email y password del body
  const { email, password } = req.body;
  // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
  if (!email || !password) return res.sendStatus(400);

  try {
    // Validamos el email y password y obtenemos el guid
    const { guid } = checkEmailPassword(email, password);
    // GENERAR TOKEN Y DEVOLVER TOKEN
    //Construimos el JWT con el guid
    const jwtConstructor = new SignJWT({ guid });

    // Codificamos la clave secreta definida en la variable de entorno por requisito de la librería jose
    // y poder pasarla en el formato correcto (uint8Array) en el método .sign
    const encoder = new TextEncoder();
    // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa.
    // Le indicamos la cabecera, la creación, la expiración y la firma (clave secreta).
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_SECRET_KEY));

    console.log(jwt);
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send({ jwt });
  } catch (err) {
    // Si el usuario no existe enviamos un 401 (unauthorized)
    return res.sendStatus(401);
  }
};
authTokenController.profile = async (req, res) => {
  // OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  console.log(token);

  if (token == null) return res.sendStatus(401);
  const encoder = new TextEncoder();

  const { payload } = await jwtVerify(
    token,
    encoder.encode(process.env.JWT_SECRET_KEY)
  );

  // Obtenemos los datos del usuario a través de guid
  const user = USERS_BBDD.find((user) => user.guid === payload.guid);
  // Si no obtenemos usuario enviamos un  401 (unauthorized)
  if (!user) return res.sendStatus(401);
  // Borramos la password del objeto obtenido para no mostrarla
  delete user.password;
  // Y devolvemos los datos del usuario
  return res.send(user);
};

module.exports = authTokenController;
