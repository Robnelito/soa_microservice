const express = require('express')
const app = express()
const PORT = 3002

app.get('/', (req, res) => {
  res.send("client")
})

app.listen(PORT, () => {
  console.log(`client listen on port ${PORT}`);
})