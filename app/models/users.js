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
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'parent', 'admin', 'coordinator', 'admin_aux'],
        required: true
    },
    reg_token : {
        type: String,
        required : true
    }
}, {collection : 'user'});

module.exports = mongoose.model("User", userSchema);