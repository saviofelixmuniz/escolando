/**
 * @author Sávio Muniz
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: false
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
}, {collection : 'activities'});

module.exports = mongoose.model("Activity", activitySchema);