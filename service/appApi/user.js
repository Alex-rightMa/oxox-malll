const Router = require("koa-router");
const mongoose = require("mongoose");

let router = new Router();
router.get("/", async (ctx) => {
  ctx.body = "这是用户操作首页";
});
// 注册
router.post("/register", async (ctx) => {
  // 基于用户名做唯一性校验
  const User = mongoose.model("User");
  const { username } = ctx.request.body;
  const repeatedUser = await User.findOne({ username });

  if (repeatedUser) {
    ctx.body = { code: 500, message: "用户已经存在" };
  } else {
    let newUser = new User(ctx.request.body);
    await newUser
      .save()
      .then(() => {
        ctx.body = {
          code: 200,
          message: "注册成功",
        };
      })
      .catch((error) => {
        ctx.body = {
          code: 500,
          message: error,
        };
      });
  }

});

// 登陆
router.post("/login", async (ctx) => {
  //得到前端传递过来的数据
  let loginUser = ctx.request.body;
  console.log(loginUser);
  let { username, password } = loginUser;
  //引入User的model
  const User = mongoose.model("User");
  //查找用户名是否存在，如果存在开始比对密码
  await User.findOne({ username })
    .exec()
    .then(async (result) => {
      if (result) {
        //console.log(User)
        //当用户名存在时，开始比对密码
        let newUser = new User(); //因为是实例方法，所以要new出对象，才能调用
        await newUser
          .comparePassword(password, result.password)
          .then((isMatch) => {
            //返回比对结果
            ctx.body = { code: 200, message: isMatch };
          })
          .catch((error) => {
            //出现异常，返回异常
            console.log(error);
            ctx.body = { code: 500, message: error };
          });
      } else {
        ctx.body = { code: 500, message: "用户名不存在" };
      }
    })
    .catch((error) => {
      console.log(error);
      ctx.body = { code: 500, message: error };
    });
});
// 获取用户列表
router.get("/list", async (ctx) => {
  const { page_size = 10 } = ctx.query;
  const pageSize = Math.max(+page_size, 1);
  const page = Math.max(+ctx.query.page, 1) - 1;
  const User = mongoose.model("User");
  ctx.body = await User.find()
    .limit(pageSize)
    .skip(page * pageSize);
});
// 用户删除
router.get("/del/:id", async (ctx) => {
  const User = mongoose.model("User");
  console.log(ctx.params.id);
  
  const user = await User.findByIdAndRemove(ctx.params.id);
  if (!user) {
    ctx.throw(404, "用户id不存在");
  }
  ctx.body = {code: 200, message: '用户删除成功'};
});


module.exports = router;
