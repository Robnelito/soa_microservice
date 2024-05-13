const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
// const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your actual secret key

const createPayment = async(req, res) => {
    console.log(req.body);
    const {idClient, firstnameClient, lastnameClient, remnantsClient, accountNumberClient, montantVirement} = req.body;

    try {
        const newPayment = await prisma.payments.create({
            data: {
                idPaiement : uuidv4(),
                idClient : parseInt(idClient),
                firstnameClient,
                lastnameClient,
                remnantsClient : parseFloat(remnantsClient),
                accountNumberClient,
                montantVirement: parseFloat(montantVirement),
                dateVirement: new Date(),
            }
        });

        res.json(newPayment);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createPayment
}