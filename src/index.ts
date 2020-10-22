import mongoose, { Schema } from 'mongoose';
import { TelegrafContext } from 'telegraf/typings/context';

const UserSchema: Schema = new Schema({
  id: Number,
  username: String,
  title: String,
  type: String,
  first_name: String,
  language_code: String,
  ping: Date,
  date: { type: Date, default: new Date() },
  messages: { type: Number, default: 1 },
});

const User = mongoose.model('User', UserSchema);

const _connect = (mongoUrl: string) => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

export const disconnect = () => mongoose.disconnect();

export default (mongoUrl: string) => {
  _connect(mongoUrl);
  return async (ctx: TelegrafContext, next?: (() => any)|null) => {
    if (next) {
      next();
    }
    const chatId = ctx.update?.message?.chat?.id;
    if (!chatId) {
      return;
    }
    return await User.updateOne(
      { id: chatId },
      {
        ...ctx.update?.message?.chat,
        ping: new Date(),
        $inc: { messages: 1 }
      },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
};
