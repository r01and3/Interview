const Router = require('koa-router');

const Chat = require('../models/chat');
const User = require('../models/user');
const Message = require('../models/message');

const router = new Router().prefix('/chats');

router.post('/add', async (ctx) => {
    const { name, users } = ctx.request.body
    const chat = await Chat.findOne({ name });
    if (chat) {
        ctx.throw(400, `Chat ${name} already exist`);
    }
    const usersIsExists = await User.find({ id: users });
    if (usersIsExists.length != users.length) {
        ctx.throw(400, 'Some users added to the chat do not exist');
    }
    const req = await new Chat({name, users}).save();
    ctx.status = 201;
    ctx.body = { id: req.id };
});

router.post('/get', async (ctx) => {
    const { user } = ctx.request.body;
    const userIsExist = await User.findOne({ id: user });
    if (!userIsExist) {
        ctx.throw(400, `User ${user} not exist`);
    }
    const chats = await Chat.find({ users: user });
    let lastMessages = [];
    for (const chat of chats) {
        const lastMessage = await Message.findOne({ chat: chat.id }).sort({ field: 'asc', _id: -1 }).limit(1);
        lastMessages.unshift(lastMessage);
    }
    lastMessages = lastMessages.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
    req = [];
    for (const message of lastMessages) {
        const chat = await Chat.findOne({id: message.chat});
        req.push(chat);
    }
    ctx.body = { chats: req };
});

module.exports = router.routes();
