const {PrismaClient} = require('@prisma/client')
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

const prisma = new PrismaClient()
const root = async (req, res) => {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}

const isExistingUser = async (user_email) => {
  const user = await prisma.user.findFirst({
    where: {
      user_email: user_email
    }
  })

  return !!user;
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

  const user = await prisma.user.create({
    data: {
      user_id: uuidv4(),
      user_firstname: req.body.user_firstname,
      user_lastname: req.body.user_lastname,
      user_email: req.body.user_email,
      user_password: bcrypt.hashSync(req.body.user_password, salt)
    },
  })

  res.json(user)
}

module.exports = {
  root,
  register
};