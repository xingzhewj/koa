// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.url}`);
    await next();
});

router.get('/home/:name', async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `<h1>主页：${name}</h1>`;
});

app.use(router.routes());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!1</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');