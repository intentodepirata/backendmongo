// Importamos las librerías necesarias
const { Type } = require("@sinclair/typebox");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

// Definimos el esquema del DTO para el registro de usuarios
const RegisterDTOSchema = Type.Object({
  name: Type.String({
    minLength: 2,
    title: "El nombre debe tener al menos 2 caracteres",
  }),
  email: Type.String({ format: "email", title: "El email debe ser válido" }),
  password: Type.String({
    minLength: 8,
    title: "La contraseña debe tener al menos 8 caracteres",
  }),
});

// Instanciamos Ajv y añadimos formatos y errores personalizados
const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);

// Compilamos el esquema
const validate = ajv.compile(RegisterDTOSchema);

// Middleware de validación del DTO de registro de usuarios
const validateRegisterDto = (req, res, next) => {
  const isValid = validate(req.body);
  if (!isValid) {
    return res
      .status(400)
      .json({ error: ajv.errorsText(validate.errors, { separator: "\n" }) });
  }
  next();
};

module.exports = validateRegisterDto;
