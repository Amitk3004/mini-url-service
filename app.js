const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const baseRoutes = require('./routes/url-routes')

app.use(bodyParser.json())

/* CORS Error Handeling  */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'Delete');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
});

/* Base routing */
app.use('/url', baseRoutes);

/* Error route  */
app.use('/', (req, res, next) => {res.status(404).json({error: 'No routes available to handle this request'})})


app.listen(7000, () => console.log('Listening at port 7000'));