/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSectionSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {collection : 'course_section'});

module.exports = mongoose.model("CourseSection", courseSectionSchema);