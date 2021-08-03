const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const baseRoutes = require('./routes/url-routes')
const mongoose = require('mongoose');

app.use(bodyParser.json())

/* CORS Error Handeling  */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'Delete');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
});

/* Base routing middleware */
app.use('/', baseRoutes);

/* Routes Error Handeling middleware  */
app.use('/', (req, res, next) => {res.status(404).json({error: 'No routes available to handle this request'})})

/* Custome Error handling middleware */
app.use((error, req, res, next) => {
    res.status(error.statusCode).json({error: error});
})

/* Mongo DB configuration */
mongoose.connect('mongodb+srv://mongo_user:IbJFZJ58BUpU0tOy@basecluster.kmwyl.mongodb.net/miniUrl?retryWrites=true&w=majority').then(res => {
    app.listen(7000, () => console.log('Listening at port 7000'));
}).catch(err => {console.log(err.message)})