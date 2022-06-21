const Router = require('koa-router');

const User = require('../models/user');

const router = new Router().prefix('/users');

router.post('/add', async (ctx) => {
    const { username } = ctx.request.body
    const user = await User.findOne({ username });
    if (user) {
        ctx.throw(400, `User ${username} already exist`);
    }
    const req = await new User({ username }).save();
    ctx.status = 201;
    ctx.body = { id: req.id, username: req.username };
});

module.exports = router.routes();
