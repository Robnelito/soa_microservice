const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()

const isExistingUser = async (user_email) => {
  const user = await prisma.user.findFirst({
    where: {
      user_email: user_email
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

module.exports = {
  isExistingUser,
  registerUser,
  connexionUser,
}