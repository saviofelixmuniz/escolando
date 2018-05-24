/**
 * @author Sávio Muniz
 */

const RestHelper = require('../helpers/rest-helper');

function register(req, res) {
    var table = req.params.table;
    var objModel = require(`../models/${table}`);
    var newObj = req.body;

    objModel.create(newObj).then(function (obj) {
        RestHelper.sendJsonResponse(res, 200, obj);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function search(req, res) {
    var table = req.params.table;
    var objModel = require(`../models/${table}`);

    objModel.find({}).then(function (objs) {
        RestHelper.sendJsonResponse(res, 200, objs);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function findOne(req, res) {
    var table = req.params.table;
    var id = req.params.id;
    var objModel = require(`../models/${table}`);

    objModel.findOne({_id: id}).then(function (obj) {
        RestHelper.sendJsonResponse(res, 200, obj);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function update(req, res) {
    var table = req.params.table;
    var id = req.params.id;
    var objModel = require(`../models/${table}`);
    var updateObj = req.body;

    objModel.update({_id : id}, {$set : updateObj}, {multi : false}).then(function (updated) {
        RestHelper.sendJsonResponse(res, 200, updated);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function remove(req, res) {
    var table = req.params.table;
    var id = req.params.id;
    var objModel = require(`../models/${table}`);

    objModel.deleteOne({_id: id}).then(function (result) {
        RestHelper.sendJsonResponse(res, 200, result);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

module.exports = {
    register : register,
    search: search,
    update: update,
    findOne: findOne,
    remove : remove
};