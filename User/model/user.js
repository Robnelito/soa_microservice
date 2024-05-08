const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()

const isExistingUser = async (user_email = '', user_id = '') => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          user_email: user_email,
        },
        {
          user_id: user_id
        }
      ]
    }
  })

  return !!user;
}

const registerUser = async (data) => {
  return prisma.user.create({
    data: data,
  });
}

const connexionUser = async (user_email) => {
  return prisma.user.findUnique({
    where: {
      user_email: user_email
    }
  })
}

const removeUser = async (user_id) => {
  return prisma.user.delete({
    where: {
      user_id: user_id
    }
  })
}

module.exports = {
  isExistingUser,
  registerUser,
  connexionUser,
  removeUser
}