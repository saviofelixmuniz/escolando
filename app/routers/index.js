/**
 * @author Sávio Muniz
 */

const express = require('express');

const rootRouter = express.Router();
const users = require('./routes/users');

rootRouter.use('/users', users);

module.exports = rootRouter;
