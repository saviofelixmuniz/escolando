/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'parent', 'admin', 'coordinator', 'admin_aux'],
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    reg_token : {
        type: String,
        required : false
    },
    registered_on: {
        type: Date,
        required: true
    },
    registered_by: {
        type: Schema.types.ObjectId,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    attachments: {
        type: [String],
        required: false
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    }
}, {collection : 'user'});

module.exports = mongoose.model("User", userSchema);