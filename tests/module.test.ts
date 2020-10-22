import { expect } from 'chai';
import { mongoUrl } from './config';
import Module, { disconnect } from '../src/';

it('test module', async () => {
  const m = Module(mongoUrl);
  expect(typeof m).to.be.eq('function');
  const ctx: any = {
    update: {
      message: {
        from: {
          id: 667,
          username: 'diabolic cat',
          is_bot: false,
          first_name: 'Cat',
        },
        message_id: 1,
        date: +new Date(),
        chat: {
          id: 667,
          type: '',
        },
      },
      update_id: 1,
    }
  };
  await m(ctx);
  await m(ctx);
  await m(ctx);
  await disconnect();
  // now check the existance of the item in mongo by yourself
  // should have messages === 3
  // and remove the item manually ;)
}).timeout(10000);
