module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.status = e.status || 500
        ctx.body = { status: e.status || 500, error: e.message || 'Iternal Server Error' }
    }
}