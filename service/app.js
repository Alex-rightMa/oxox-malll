const Koa = require('koa')
const app = new Koa()
const config = require("./netConfig");
const mongoose = require('mongoose')
const {connect, initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
// 加载app中间件
app.use(bodyParser())
// 设置支持跨域
app.use(cors())

let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')

// 装载所有子路由
let router = new Router();
router.use('/user',user.routes());
router.use('/goods',goods.routes());

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行函数
;(async () =>{
    await connect();
    initSchemas();

})()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(config.port,()=>{
    console.log(`[Server] starting at port ${config.port}`)
})