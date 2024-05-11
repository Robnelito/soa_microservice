const express = require('express')
const app = express()
const PORT = 3002
const bodyParser = require('body-parser');
const cors = require('cors');
const clients = require('./controller/client');

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());

app.post('/', clients.createClient);
app.get('/', clients.getClients);
app.get('/:idClient', clients.getClientById);
app.put('/:idClient', clients.updateClient);
app.delete('/:idClient', clients.deleteClient);

app.listen(PORT, () => {
  console.log(`client listen on port ${PORT}`);
})