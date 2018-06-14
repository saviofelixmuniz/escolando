/**
 * @author Sávio Muniz
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = Schema({
    value: {
        type: Number,
        required: true
    },
    activity_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Activity'
    },
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    group_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    }
}, {collection : 'marks'});

module.exports = mongoose.model("Mark", markSchema);