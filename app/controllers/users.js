/**
 * @author Sávio Muniz
 */

const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');
const CodeGenerator = require ('../helpers/code-generator');
const Mail = require('../helpers/mail');
const PasswordHelper = require('../helpers/password-helper');

const ROLE_MODELS = {
    student : require('../models/roles/student'),
    teacher : require('../models/roles/teacher'),
    coordinator : require('../models/roles/aux_admin'),
    aux_admin : require('../models/roles/aux_admin')
};

const ROLE_REGISTER_FLOW = {
    student: registerStudent,
    teacher: registerTeacher,
    coordinator: registerAuxAdmin,
    aux_admin: registerAuxAdmin
};

async function registerUser(req, res) {
    var form = req.body;
    form.reg_token = CodeGenerator(5);

    try {
        await ROLE_REGISTER_FLOW[req.body.role](form);
        mailToken(req.body.role === 'student' ? form.parent_email : form.email, form.reg_token);
        RestHelper.sendJsonResponse(res, 200, {message: 'User registered successfully', token: form.reg_token})
    } catch (e) {
        RestHelper.sendJsonResponse(res, 400, e);
    }
}

async function updateUser(req, res) {
    var userId = req.params.id;

    if (req.body.password) {
        var user = await PasswordHelper.encryptPassword(req.body);
        if (user) {
            update(user);
        } else {
            RestHelper.sendJsonResponse(res, 500, {message: 'Error while encrypting password.'});
        }
    } else {
        update(req.body);
    }

    function update(user) {
        User.update({_id: userId}, {$set : user}).then(function (user) {
            RestHelper.sendJsonResponse(res, 200, user);
        }).catch(function (err) {
            RestHelper.sendJsonResponse(res, 400, err);
        })
    }
}

async function registerStudent(form) {
    var parentUser = {
        name: form.parent_name,
        email: form.parent_email,
        role: 'parent',
        password: '1234',
        reg_token: form.reg_token,
        registered_on: new Date(),
        register_by: form.registered_by
    };
    parentUser = await PasswordHelper.encryptPassword(parentUser);

    var studentUser = {
        name: form.student_name,
        email: form.student_email,
        role: 'student',
        password: '1234',
        registered_on: new Date(),
        register_by: form.registered_by
    };
    studentUser = await PasswordHelper.encryptPassword(studentUser);

    studentUser = await User.create(studentUser);
    parentUser = await User.create(parentUser);

    var studentObj = {
        group_id: form.group_id,
        course_id: form.course_id,
        user_id: studentUser._id,
        parent_ids: [parentUser._id]
    };

    await ROLE_MODELS['student'].create(studentObj);
}

async function registerTeacher(form) {
    var teacherUser = {
        name: form.name,
        email: form.email,
        role: 'teacher',
        password: '1234',
        reg_token: form.reg_token,
        registered_on: new Date(),
        register_by: form.registered_by
    };
    teacherUser = await PasswordHelper.encryptPassword(teacherUser);

    teacherUser = await User.create(teacherUser);

    var teacherObj = {
        subject_ids: [form.subject_id],
        user_id: teacherUser._id
    };

    await ROLE_MODELS['teacher'].create(teacherObj);
}

async function registerAuxAdmin(form) {
    var auxAdminUser = {
        name: form.name,
        email: form.email,
        role: form.role,
        password: '1234',
        reg_token: form.reg_token,
        registered_on: new Date(),
        register_by: form.registered_by
    };
    auxAdminUser = await PasswordHelper.encryptPassword(auxAdminUser);

    auxAdminUser = await User.create(auxAdminUser);

    var auxAdminObj = {
        user_id: auxAdminUser._id,
        admission_date: new Date(),
        course_section_id: form.course_section
    };

    await ROLE_MODELS['aux_admin'].create(auxAdminObj);
}

function mailToken(email, token) {
    var html = `Um usuário foi pré-cadastrado para você em nosso sistema, acesse
                <a href="http://localhost:8080/token-confirmation">EscolandoApp</a> e use o token
                <strong>${token}</strong> para terminar o seu cadastro!`;
    Mail.send(email, 'Token de cadastro', html);
}

function getUserByToken(req, res) {
    var query = {reg_token : req.params.token};

    User.findOne(query).then(function (user) {
        RestHelper.sendJsonResponse(res, 200, user);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 400, err);
    });
}

function getUsersByName(req, res) {
    var query = {name : { $regex: req.query.name, $options: 'i' }};

    User.find(query, '', {lean: true}).then(function (users) {
        RestHelper.sendJsonResponse(res, 200, users);
    }).catch(function (err) {
        RestHelper.sendJsonResponse(res, 500, err);
    });
}

async function getStudentByParent(req, res) {
    var student = await ROLE_MODELS['student'].findOne({parent_ids: req.params.parentId}, '', {lean: true});
    var userStudent = await User.findOne({_id: student.user_id}, '', {lean: true});

    var mergedObj = {...userStudent, ...student};

    RestHelper.sendJsonResponse(res, 200, mergedObj);
}

async function getParentById(req, res) {
    var parent = await User.findOne({_id: req.params.parentId}, '', {lean: true});

    var mergedObj = {...parent};

    RestHelper.sendJsonResponse(res, 200, mergedObj);
}

async function updateRoleObj(req, res) {
    var roleId = req.params.id;
    var role = req.params.role;

    ROLE_MODELS[role].update({_id: roleId}, {$set : req.body}, {upsert: true}).then(function (user) {
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

async function getStudentsByGroup(req, res) {
    var students = await ROLE_MODELS['student'].find({group_id: req.params.groupId}, '', {lean: true});
    var users = [];

    for (var student of students) {
        var userStudent = await User.findOne({_id: student.user_id}, '', {lean: true});
        var mergedObj = {...userStudent, ...student};

        users.push(mergedObj)
    }

    RestHelper.sendJsonResponse(res, 200, users);
}

async function getTeacherById(req, res) {
    var teacher = await ROLE_MODELS['teacher'].findOne({user_id: req.params.teacherId}, '', {lean: true});
    var mergedObj = {...teacher}

    RestHelper.sendJsonResponse(res, 200, mergedObj);
}

module.exports = {
    registerUser : registerUser,
    updateUser : updateUser,
    getUserByToken: getUserByToken,
    registerRoledUser: registerRoledUser,
    getStudents : getStudents,
    getStudentByParent : getStudentByParent,
    getParentById : getParentById,
    updateRoleObj: updateRoleObj,
    getStudentsByGroup: getStudentsByGroup,
    getTeacherById : getTeacherById,
    getUsersByName : getUsersByName
};
