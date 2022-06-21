const Koa = require('koa');

const config = require('./lib/config');
const middlewares = require('./middlewares/index');
const routes = require('./routes/index');
const mongooseConfig = require('./lib/mongoose-config');

const app = new Koa();

middlewares.forEach((middleware) => app.use(middleware));

app.use(routes.routes());
app.use(routes.allowedMethods());

mongooseConfig();

app.listen(config.port, () => console.log('Server has been started'));
