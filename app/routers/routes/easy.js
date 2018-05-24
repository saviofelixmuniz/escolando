/**
 * @author Sávio Muniz
 */

var express = require('express');
var easyRouter = express.Router();
var easyController = require('../../controllers/easy');

easyRouter.post('/:table', easyController.register);
easyRouter.get('/:table', easyController.search);
easyRouter.get('/:table/:id', easyController.findOne);
easyRouter.put('/:table/:id', easyController.update);
easyRouter.delete('/:table/:id', easyController.remove);

module.exports = easyRouter;