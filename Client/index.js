const express = require('express')
const app = express()
const PORT = 3002
const bodyParser = require('body-parser');
const cors = require('cors');
const clients = require('./controller/client');

app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));

app.use(bodyParser.json());

app.post('/clients', clients.createClient);
app.get('/clients', clients.getClients);
app.get('/client/:idClient', clients.getClientById);
app.put('/client/:idClient', clients.updateClient);
app.delete('/client/:idClient', clients.deleteClient);

app.listen(PORT, () => {
  console.log(`client listen on port ${PORT}`);
})