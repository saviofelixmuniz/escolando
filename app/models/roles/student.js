/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema({
    group_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Group"
    },
    course_id: {
        type : Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    allergies: {
        type: [String],
        required: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    disabilities: {
        type: [String],
        required: false
    },
    parent_ids: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "User"
    },
    notes: {
        type: [String],
        required: false
    }
}, {collection : 'student'});

module.exports = mongoose.model("Student", studentSchema);