const Url = require('../models/url');
// POST /create
exports.createMiniUrl = (req, res, next) => {
    const url = new Url({
        originalUrl: req.body.originalUrl,
        shortUrl: generateMiniUrl(),
        expireDateTime: setExpireDateTime()
    })
    url.save().then(urlresult => {
        res.status(200).json(urlresult)
    }).catch(err => { errorHandeler(next, 'Database Error!', 500) })
}

// GET /:shorturl
exports.getOriginalUrl = (req, res, next) => {
    const requestedUrl = req.params.shorturl;
    Url.findOne({shortUrl: requestedUrl}).then(result => {
        if(!result) {
            errorHandeler(next, 'No Url found!', 404);
        } else if (result.expireDateTime.getTime() <= (new Date().getTime())) {
            Url.deleteOne({shortUrl: requestedUrl}).then(delResult => {
                /* logic after delete if any required */
            }).catch(err => console.log(err.message));
            errorHandeler(next, 'This link is expired!', 400);
        } else {
            res.status(301).redirect(result.originalUrl);
        }
    }).catch(err => {errorHandeler(next, err.message)})
}

// DELETE /:shorturl
exports.deleteRecord = (req, res, next) => {
    const requestedUrl = req.params.shorturl;
    Url.deleteOne({shortUrl: requestedUrl}).then(delResult => {
        res.status(200).json({message: 'Record Deleted'});
    }).catch(err => errorHandeler(next, err.message));
}

function setExpireDateTime() {
    let date = new Date();
    date.setHours(date.getHours() + 1);
    return date;
}


function generateMiniUrl() {
    let miniString = '';
    const series = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for(let i = 0; i<7; i++) {
        miniString = miniString.concat(series[Math.floor(Math.random() * series.length)]);
    }
    return miniString;
}

function errorHandeler(next, errorMessage, statusCode = 500) {
    const error = new Error();
    error.message = errorMessage;
    error.statusCode = statusCode;
    console.log(error);
    next(error);
}