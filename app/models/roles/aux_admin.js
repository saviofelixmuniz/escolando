/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auxAdminSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    admission_date: {
        type: Date,
        required: false
    },
    course_section_id: {
        type: Schema.Types.ObjectId,
        ref: 'CourseSection',
        required: false
    }
}, {collection : 'aux_admin'});

module.exports = mongoose.model("AuxAdmin", auxAdminSchema);