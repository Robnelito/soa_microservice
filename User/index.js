const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 3001
const userRoute = require('./controller/user')

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(bodyParser.json());

app.get('/', userRoute.root)
app.post('/', userRoute.register)

app.listen(PORT, () => {
    console.log(`user listen on port ${PORT}`);
})