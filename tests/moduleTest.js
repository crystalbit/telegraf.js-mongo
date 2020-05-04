const expect = require('chai').expect;
const { mongoUrl } = require('./config');

it('test module', () => {
    const m = require('../index')(mongoUrl);
    expect(typeof m).to.be.eq('function');
    const ctx = {
        update: {
            message: {
                from: {
                    id: 666,
                    username: 'diabolic cat'
                }
            }
        }
    }
    m(ctx);
    m(ctx);
    m(ctx);
    // now check the existance of the item in mongo by yourself
    // should have messages === 3
    // and remove the item manually ;)
})