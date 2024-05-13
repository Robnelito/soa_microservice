const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3003
const payment = require('./controller/payment')
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));

app.use(bodyParser.json());
app.post('/', payment.getPayment);
app.post('/updateSoldeClient', payment.updateSoldeClient);

app.get('/:paymentId', payment.getPaymentById);
app.delete('/:paymentId', payment.deletePayment);


app.listen(PORT, () => {
  console.log(`payment listen on port ${PORT}`);
})