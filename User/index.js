const express = require('express')
const app = express()
const PORT = 3001

app.get('/', (req, res) => {
  res.send("user")
})

app.listen(PORT, () => {
  console.log(`user listen on port ${PORT}`);
})