const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const { v4: uuidv4 } = require('uuid');

function generateAccountNumber() {
    let accountNumber = '';
    const characters = '0123456789';
    const length = 15; // Longueur du numéro de compte

    for (let i = 0; i < length; i++) {
        accountNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return accountNumber;
}

const createClient = async(req, res) => {
    const { firstnameClient, lastnameClient, mailClient, phoneNumberClient, addressClient, remnantsClient, accountNumberClient } = req.body;
    const num_compte = generateAccountNumber();

    try {
        const newClient = await prisma.clients.create({
            data: {
                idClient: uuidv4(),
                firstnameClient,
                lastnameClient,
                mailClient,
                phoneNumberClient,
                addressClient,
                remnantsClient,
                accountNumberClient: num_compte
            }
        });
        res.json(newClient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClients = async(req, res) => {
    try {
        const clients = await prisma.clients.findMany();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClientById = async(req, res) => {
    const clientId = req.params.idClient;
    try {
        const client = await prisma.clients.findUnique({ where: { idClient: clientId } });
        if(!client) {
            res.status(404).json({ error: 'Le client est introuvable' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateClient = async(req, res) => {
    const clientId = req.params.idClient;
    const { firstnameClient, lastnameClient, mailClient, phoneNumberClient, addressClient, remnantsClient } = req.body;
    try {
        let client = await prisma.clients.findUnique({ where: { idClient: clientId } });
        if(!client) {
            res.status(404).json({ error: 'Le client est introuvable' });
        }

        const upClient = await prisma.clients.update({
            where: {
                idClient: clientId
            },
            data: {
                firstnameClient,
                lastnameClient,
                mailClient,
                phoneNumberClient,
                addressClient,
                remnantsClient
            }
        });
        res.json(upClient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteClient = async(req, res) => {
    const clientId = req.params.idClient;
    try {
        await prisma.clients.delete({ where: { idClient: clientId }});
        res.json({ message: 'Le client a été supprimé avec succès' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
}