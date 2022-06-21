const Router = require('koa-router');

const Chat = require('../models/chat');
const Message = require('../models/message');

const router = new Router().prefix('/messages');

router.post('/add', async (ctx) => {
    const { chat, author, text } = ctx.request.body;
    const chatIsExist = await Chat.findOne({ id: chat });
    if (!chatIsExist) {
        ctx.throw(400, `Chat ${chat} not exist`);
    }
    if (!chatIsExist.users.includes(author)) {
        ctx.throw(401, `User ${author} does not have access to the chat`);
    }
    const req = await new Message({ chat, author, text }).save();
    ctx.status = 201;
    ctx.body = { id: req.id };
});

router.post('/get', async (ctx) => {
    const { chat } = ctx.request.body;
    const chatIsExist = await Chat.findOne({ id: chat });
    if (!chatIsExist) {
        ctx.throw(400, `Chat ${chat} not exist`);
    }
    const messages = await Message.find({ chat: chat }).sort({ field: 'asc', _id: -1 });
    ctx.body = { messages: messages };
});

module.exports = router.routes();
