const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, required: true },
    status: { type: Boolean, default: false },
    expiration_date: { type: Date, required: true }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
