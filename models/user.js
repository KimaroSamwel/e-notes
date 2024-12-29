const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    program: { type: String, required: true },
    subscription_status: { type: Boolean, default: false },
    subscription_expiration: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
