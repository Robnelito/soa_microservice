const express = require('express')
const app = express()
const PORT = 3003

app.get('/', (req, res) => {
  res.send("payment")
})

app.listen(PORT, () => {
  console.log(`payment listen on port ${PORT}`);
})