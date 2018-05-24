/**
 * @author Sávio Muniz
 */

const express = require('express');

const rootRouter = express.Router();
const users = require('./routes/users');
const easy = require('./routes/easy');

rootRouter.use('/users', users);
rootRouter.use('/easy', easy);

module.exports = rootRouter;
