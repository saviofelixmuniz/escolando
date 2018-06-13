/**
 * @author André Gonçalves
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annoucementSchema = Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: false
    },
    group_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    }
}, {collection : 'announcement'});

module.exports = mongoose.model("Announcement", annoucementSchema);