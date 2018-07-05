/**
 * @author Anderson Menezes
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
    content: {
        type: String,
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {collection : 'planning'});

module.exports = mongoose.model("Planning", groupSchema);