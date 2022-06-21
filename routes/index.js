const Router = require('koa-router');

const users = require('./users');
const chats = require('./chats');
const messages = require('./messages');

const router = new Router();

router.use(users);
router.use(chats);
router.use(messages);

module.exports = router;
