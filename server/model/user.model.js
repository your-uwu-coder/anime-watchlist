const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        validate: [isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true });

// MIDDLEWARE FUNCTIONS

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );


UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });

// END OF MIDDLEWARE FUNCTIONS


module.exports = mongoose.model('User', UserSchema)