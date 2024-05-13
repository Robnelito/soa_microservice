const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const axios = require ('axios');
const config = require('../config.json');
// const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your actual secret key

const getPayment = async(req, res) => {
    try {
        const payments = await prisma.payments.findMany();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPaymentById = async(req, res) => {
    const paymentId = req.params.paymentId;
    try {
        const payment = await prisma.payments.findUnique({ where: { idPaiement: paymentId } });
        if(!payment) {
            res.status(404).json({ error: 'Le payement est introuvable' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deletePayment = async(req, res) => {
    const paymentId = req.params.paymentId;
    try {
        await prisma.payments.delete({ where: { idPaiement: paymentId }});
        res.json({ message: 'Le payement a été supprimé avec succès' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSoldeClient = async (req, res) => {
    const { virement, accountNumberClient } =  req.body;
    
    try {
        const client = await axios.get(`${config.API_HOST}/client/${accountNumberClient}`);
        console.log(client.data);
        client.data.remnantsClient = client.data.remnantsClient + parseFloat(virement);
        
        const update = await axios.put(`${config.API_HOST}/client/${accountNumberClient}`, client.data);

        if(update){
            try {
                const newPayment = await prisma.payments.create({
                    data: {
                        idPaiement : uuidv4(),
                        accountNumberClient : accountNumberClient,
                        montantVirement: parseFloat(virement),
                        dateVirement: new Date(),
                    }
                });
            } catch (error) {
                res.status(500).json({error: error.message});
            }
        }

        res.status(200).json(update.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
module.exports = {
    getPayment,
    getPaymentById,
    deletePayment,
    updateSoldeClient
}