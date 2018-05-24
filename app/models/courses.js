/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = Schema({
    name: {
        type: String,
        required: true
    },
    course_section_id: {
        type: Schema.Types.ObjectId,
        ref: 'CourseSection',
        required: true
    },
    next: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    },
    previous: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    }
}, {collection : 'course'});

module.exports = mongoose.model("Course", courseSchema);