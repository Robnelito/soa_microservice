const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3003
const payment = require('./controller/payment')

app.get('/', (req, res) => {
  res.send("payment")
})

app.use(bodyParser.json());
app.post('/', payment.createPayment);


app.listen(PORT, () => {
  console.log(`payment listen on port ${PORT}`);
})