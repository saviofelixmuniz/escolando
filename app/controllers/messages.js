const Message = require('../models/messages');
const User = require('../models/users');
const Formatter = require('../helpers/format');

async function getMessagesWithUser(req, res) {
    var user = req.params.id;

    Message.find(
        {
            $or: [{from: req.user._id, to: user}, {to: req.user._id, from: user}]
        }, '',
        {
            sort: { date: 1 },
            lean: true
        })
        .populate('from')
        .populate('to')
        .exec(function (err, messages) {
            if (err) {
                res.status(500).json({message: err.stack});
            } else {
                res.status(200).json(messages);
            }
    });
}

async function getUsersMessaged(req, res) {
    Message.aggregate([
        {
            $match: {
                $or: [{from: req.user._id}, {to: req.user._id}]
            }
        },
        {
            $group: {
                _id: null, to: {$addToSet: "$to"}, from: {$addToSet: "$from"}
            }
        }])
        .exec(function (err, obj) {
            if (err) {
                res.status(500).json({message: err.stack});
            } else {
                var users = [];
                for (let fromId of obj[0].from) {
                    if (!findUser(users, fromId.toString()) && fromId.toString() !== req.user._id.toString()) {
                        users.push(fromId);
                    }
                }
                for (let toId of obj[0].to) {
                    if (!findUser(users, toId.toString()) && toId.toString() !== req.user._id.toString()) {
                        users.push(toId);
                    }
                }

                User.find({_id: {$in: users}}, '', {lean: true}).then(function (users) {
                    res.status(200).json(users);
                }).catch(function (err) {
                    res.status(500).json({message: err.stack});
                })
            }
    });
}

function findUser(userIds, id) {
    for (let userId of userIds) {
        if (userId.toString() === id) return true;
    }

    return false;
}

async function sendMessage(req, res) {
    var message = req.body;
    message.from = req.user._id;

    Message.create(message).then(function (message) {
        Message.populate(message, {path: 'to'}, function(err, message) {
            Message.populate(message, {path: 'from'}, function(err, message) {
                res.status(200).json(message);
            });
        });
    }).catch(function (err) {
        res.status(500).json({message: err.stack});
    });
}

module.exports = {
    sendMessage: sendMessage,
    getMessagesWithUser: getMessagesWithUser,
    getUsersMessaged: getUsersMessaged
};