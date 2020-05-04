const mongoose = require('mongoose');

const User = mongoose.model('User', {
    id: Number,
    username: String,
    first_name: String,
    language_code: String,
    ping: Date,
    date: { type: Date, default: new Date },
    messages: { type: Number, default: 1 }
});

const _connect = mongoUrl => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

module.exports = mongoUrl => {
    _connect(mongoUrl);
    return async (ctx, next) => {
        next();
        const update = ctx.update || {};
        const msg = update.message || {};
        const from = msg.from || {};
        if (!from.id) return;
        return await User.updateOne(
            { id: from.id },
            {
                ... from,
                ping: new Date,
                $inc: { messages: 1 }
            },
            { upsert: true, setDefaultsOnInsert: true }
        );
    }
};