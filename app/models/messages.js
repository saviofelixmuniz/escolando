/**
 * @author Anderson Menezes
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }
}, {collection : 'messages'});


module.exports = mongoose.model("Message", messagesSchema);