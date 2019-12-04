const express = require('express');
const usersRouter = require('./users/routes');

const appRouter = express.Router();

appRouter.use(usersRouter);

module.exports = appRouter;