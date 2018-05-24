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
        required : true,
        select: false
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'parent', 'admin', 'coordinator', 'admin_aux'],
        required: true
    },
    birthday: {
        type: Date,
        required: true
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
        type: Schema.types.ObjectId,
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
            delete ret._id;
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

userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isNew) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        })
    });
});

module.exports = mongoose.model("User", userSchema);