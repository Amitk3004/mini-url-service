const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const baseRoutes = require('./routes/url-routes')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

app.use(express.json())

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
const db_connection_str = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@basecluster.kmwyl.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(db_connection_str, {useUnifiedTopology: true, useNewUrlParser: true}).then(res => {
    app.listen(process.env.PORT || 7000, () => console.log(`Listening at port ${process.env.PORT || 7000}`));
}).catch(err => {console.log(err.message)})