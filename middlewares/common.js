logger = (req, res, next) => {
    console.log(`logged on ${req.url} ${req.method} -- ${new Date()}`);
    next();
};

errRoute = (req, res, next) => {
    var error = new Error('route not found. please try with another route!');
    error.status = 404;
    next(error);
};

errHandler = (err, req, res, next) => {
    var errorObject = {
        status: err.status,
        error: {
            message: err.message
        }
    }
    res.status(err.status).json(errorObject);
};

joiHandler = (err, req, res, next) => {
    if(err.joi) {
        res.status(400).json({error: error.joi.message});
    }
    res.status(500).send(err);
};

module.exports = {
    logger,
    errRoute,
    errHandler,
    joiHandler
};  