const userModel = require("../service/schemas/userSchema.js");

const accountController = {};

accountController.getUser = async (req, res) => {
  const { guid } = req.params;
  console.log(guid);
  const user = await userModel.findById(guid);
  if (!user) {
    return res.status(404).send("la cuenta no existe");
  }
  res.send(user);
};
accountController.addUser = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).send("error en el body");
  }
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).send("la cuenta ya existe");
  }
  const newUser = new userModel({ name, email, password });
  await newUser.save();
  res.send("cuenta creada");
};

accountController.updateUser = async (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400);
  }
  const user = await userModel.findById(guid);
  if (!user) {
    return res.status(404).send("la cuenta no existe");
  }
  user.name = name;
  await user.save();
  res.send(user);
};
accountController.deleteUser = async (req, res) => {
  const { guid } = req.params;
  const user = userModel.findById(guid);
  if (!user) {
    return res.status(404).send("la cuenta no existe");
  }
  await user.deleteOne();
  res.send("cuenta eliminada");
};

module.exports = accountController;
