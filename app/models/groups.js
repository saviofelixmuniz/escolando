/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
    name: {
        type: String,
        required: true
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    location: {
        type: String,
        required: false
    }
}, {collection : 'group'});

module.exports = mongoose.model("Group", groupSchema);