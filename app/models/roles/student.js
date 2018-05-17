/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema({
    group: {
        type: String,
        required: true
    },
    course: {
        type : String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    parent_email: {
        type: String,
        required: true
    },
    parent_phone: {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    }
}, {collection : 'student'});

module.exports = mongoose.model("Student", studentSchema);