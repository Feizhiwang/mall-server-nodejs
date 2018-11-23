const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

let home = new Router()
// 使用ctx.body解析中间件
app.use(bodyParser())

// 子路由1
home.post('/userCenter/register', async ( ctx )=>{
  console.log(ctx.request.body)
  let status = 0 
  if(Math.random() > 0.5) {
    status = 1
  }
  let html = {
    status: status
  }
  ctx.body = JSON.stringify(html)
})

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

// 装载所有子路由
let router = new Router()
router.use('', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})