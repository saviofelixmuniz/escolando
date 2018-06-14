/**
 * @author Sávio Muniz
 */

const express = require('express');

const rootRouter = express.Router();
const users = require('./routes/users');
const easy = require('./routes/easy');
const auth = require('./routes/auth');
const marks = require('./routes/marks');

rootRouter.use('/users', users);
rootRouter.use('/easy', easy);
rootRouter.use('/', marks);
rootRouter.use('/', auth);

module.exports = rootRouter;
