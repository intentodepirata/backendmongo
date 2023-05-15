const { USERS_BBDD } = require("../bbdd.js");

// Función para validar email y password
const checkEmailPassword = (email, password) => {
  // Filtramos el email entre las cuentas para buscarlo
  const user = USERS_BBDD.find((user) => user.email === email);
  // Si no existe el usuario lanzamos un error
  if (!user) throw new Error();
  // Si la password no coincide con la recibida lanzamos un error
  if (user.password !== password) throw new Error();
  // Si todo es correcto devolvemos el usuario
  return user;
};

module.exports = checkEmailPassword;
