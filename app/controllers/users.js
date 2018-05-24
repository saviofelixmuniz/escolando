/**
 * @author Sávio Muniz
 */

const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');
const CodeGenerator = require ('../helpers/code-generator');

const ROLE_MODELS = {
    student : require('../models/roles/student'),
    teacher : require('../models/roles/teacher'),
    coordinator : require('../models/roles/aux_admin'),
    aux_admin : require('../models/roles/aux_admin')
};

function registerUser(req, res) {
    var newUser = req.body;
    newUser.reg_token = CodeGenerator(5);

    User.create(newUser).then(function (user) {
        RestHelper.sendJsonResponse(res, 200, user);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function getUserByToken(req, res) {
    var query = {reg_token : req.params.token};

    User.find(query).then(function (user) {
        RestHelper.sendJsonResponse(res, 200, user);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

async function registerRoledUser(req, res) {
    var newRoledUser = req.body;
    var role = req.params.role;
    var token = req.params.token;

    if (!ROLE_MODELS[role])
        RestHelper.sendJsonResponse(res, 404, {err : 'No such role'});

    var user = await User.find({reg_token : token});

    newRoledUser.user_id = user[0]._id;

    ROLE_MODELS[role].update({user_id : newRoledUser.user_id}, {$set : newRoledUser}, {upsert : true}).then(function (user) {
        RestHelper.sendJsonResponse(res, 201, user);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

async function getStudents(req, res) {
    var students = await ROLE_MODELS['student'].find({},'',{lean: true});

    var promises = [];

    students.forEach(async function (student) {
        promises.push(User.findOne({_id : student.user_id},'',{lean:true}))
    });

    Promise.all(promises).then(function (users) {
        users.forEach(function(user, index){
            for (var attrName in user) {
                students[index][attrName] = user[attrName];
            }
        });

        RestHelper.sendJsonResponse(res, 200, students);
    });

}

module.exports = {
    registerUser : registerUser,
    getUserByToken: getUserByToken,
    registerRoledUser: registerRoledUser,
    getStudents : getStudents
};