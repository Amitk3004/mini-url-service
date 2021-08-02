
// POST /url/create
exports.createMiniUrl = (req, res, next) => {
    res.status(200).json({id:'1232', shortUrl: req.params.shorturl, originalUrl: 'https://google.co.in'})
}

// GET /url/:shorturl
exports.getOriginalUrl = (req, res, next) => {
    res.status(301).redirect('https://google.co.in');
}

// DELETE /url/:shorturl
exports.deleteRecord = (req, res, next) => {
    res.status(200).json({message: 'Record Deleted'});
}