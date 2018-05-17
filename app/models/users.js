/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = Schema({
    user: {
        type: String,
        required: true
    },
    question: {
        type: Number,
        required: true
    },
    quiz: {
        type: String,
        required: true
    },
    group : {
        type: Schema.Types.ObjectId,
        ref : "Groups",
        required: true
    }
}, {collection : 'status'});

module.exports = mongoose.model("Status", statusSchema);