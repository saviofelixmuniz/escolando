/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = Schema({
    name: {
        type: String,
        required: true
    },
    courses_id: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Course'
    }
}, {collection : 'subject'});

module.exports = mongoose.model("Subject", subjectSchema);