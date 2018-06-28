/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'parent', 'admin', 'coordinator', 'admin_aux', 'teacher'],
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    reg_token : {
        type: String,
        required : false
    },
    registered_on: {
        type: Date,
        required: true
    },
    registered_by: {
        type: Schema.Types.ObjectId,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    attachments: {
        type: [String],
        required: false
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    }
}, { collection: 'user',
    toObject: {
        transform: function (doc, ret) {
            delete ret.id;
            delete ret.password;
        },
        getters: true
    }
});

userSchema.methods.comparePassword = function (password, next) {
    var user = this;
    bcrypt.compare(password, user.password, function(err, match){
        if(err) {
            next(err);
            return;
        }

        if(match){
            next(null, true);
        } else {
            next(err);
        }
    });
};

module.exports = mongoose.model("User", userSchema);
