/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
    plan: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
}, {collection : 'classes'});

module.exports = mongoose.model("Class", classSchema);