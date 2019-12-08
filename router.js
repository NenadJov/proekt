const express = require('express');
const usersRouter = require('./users/routes');
const portRouter = require('./portfolio/routes');

const appRouter = express.Router();

appRouter.use(usersRouter);
appRouter.use(portRouter);

module.exports = appRouter;