const {PrismaClient} = require('@prisma/client')
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {isExistingUser, registerUser, connexionUser} = require("../model/user");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

const prisma = new PrismaClient()

const root = async (req, res) => {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}

const register = async (req, res) => {
  if (!req.body.user_firstname || !req.body.user_email) {
    res.json({tag: "error", message: "firstname or email is empty"})
    return
  }

  if (await isExistingUser(req.body.user_email)) {
    res.json({tag: "error", message: "user already exist"})
    return
  }
  let data = {
    user_id: uuidv4(),
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_email: req.body.user_email,
    user_password: bcrypt.hashSync(req.body.user_password, salt)
  }

  const user = await registerUser(data)

  res.json(user)
}

const connexion = async (req, res) => {
  if (!req.body.user_email) {
    res.json({tag: "error", message: "email is empty"})
    return
  }

  if (!req.body.user_password) {
    res.json({tag: "error", message: "password is empty"})
    return
  }

  if (!await isExistingUser(req.body.user_email)) {
    res.json({tag: "error", message: "user don't exist"})
    return
  }

  let user = await connexionUser(req.body.user_email);

  bcrypt.compare(req.body.user_password, user.user_password, function (err, result) {
    if (result === true) {
      let token = jwt.sign(user, process.env.JWT_SECRET)
      res.json({token, user})
    } else {
      res.json({tag: "error", message: "Mot de passe incorrect"})
    }
  });
}

module.exports = {
  root,
  register,
  connexion
};