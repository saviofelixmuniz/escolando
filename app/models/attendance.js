/**
 * @author Sávio Muniz
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
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
    attended: {
        type: Boolean,
        required: true
    }
}, {collection : 'attendances'});

module.exports = mongoose.model("Attendance", attendanceSchema);