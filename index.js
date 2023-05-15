const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());

// Require account routes
const accountRouter = require("./routes/accountRouter");

// using as middleware
app.use("/account", accountRouter);

// // Require auth routes

const authRouter = require("./routes/authRouter");
const chechBody = require("./middlewares/checkBody");
// middleware que hemos importado del router authRouter
app.use("/auth", authRouter, chechBody);

// middleware para authSessionRouter
const authSessionRouter = require("./routes/authSessionRouter");
const authTokenRouter = require("./routes/authTokenRouter");
const mongodbConnection = require("./service/mongodb");
// middleware que hemos importado del router authRouter
app.use("/auth-session", authSessionRouter);

// middleware que hemos importado del router authRouter
app.use("/auth-token", authTokenRouter);

// app.listen(PORT, () => console.log(`Server in port ${PORT}`));

// Conectamos con la base de datos y el servidor
const main = async () => {
  try {
    await mongodbConnection();
    console.log("Database connection OK!");
    app.listen(PORT, () => console.log(`Server in port ${PORT}`));
  } catch (e) {
    console.log("Error in database connection: ", e.message);
  }
};

// Llamamos a la función declarada
main();
