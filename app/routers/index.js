/**
 * @author Sávio Muniz
 */

const express = require('express');

const rootRouter = express.Router();
const users = require('./routes/users');
const auth = require('./routes/auth');

rootRouter.use('/users', users);
rootRouter.use('/', auth);

module.exports = rootRouter;
