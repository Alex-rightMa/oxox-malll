const Router = require("koa-router");
let router = new Router();
// const Goods = require("../database/schema/Goods");
const mongoose = require("mongoose");
const fs = require("fs");

// 批量导入商品信息
router.get("/insertAllGoodsInfo", async (ctx) => {
  fs.readFile("./data_json/newGoods.json", "utf8", (err, data) => {
    // console.log(`当前工作目录是: ${process.cwd()}`);
    data = JSON.parse(data);
    let totalNum = data.length;
    let saveCount = 0;
    const Goods = mongoose.model("Goods");
    data.map(async (value, index) => {
      const repeatedGoods= await Goods.findOne({ ID: value.ID});
      if(repeatedGoods){
        console.log("商品已经存在");
      }else{
        let newGoods = new Goods(value);
        newGoods
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch((error) => {
          console.log("失败：" + error);
        })
        .finally(()=>{
          console.log("成功导入商品： "+saveCount+"; 全部商品："+ totalNum);
        })
      }
      
    });
    
  });
  ctx.body = "开始导入数据--insertAllGoodsInfo";
});
// 删除商品信息
router.get("/delAllGoodsInfo", async (ctx) => {
  const Goods = mongoose.model('Goods');
  let result = await Goods.deleteMany({GOOD_TYPE: 0});
  ctx.body={code:204,message:result};
});

// 批量导入商品大类
router.get("/insertAllCategory", async (ctx) => {
  fs.readFile("./data_json/category.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = mongoose.model("Category");
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategory = new Category(value);
      newCategory
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch((error) => {
          console.log("失败：" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
// 导入商品子类
router.get("/insertAllCategorySub", async (ctx) => {
  fs.readFile("./data_json/category_sub.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model("CategorySub");
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategorySub = new CategorySub(value);
      newCategorySub
        .save()
        .then(() => {
          saveCount++;
          console.log("成功插入" + saveCount);
        })
        .catch((error) => {
          console.log("插入失败:" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
// 获取商品详细信息的接口
router.post("/getDetailGoodsInfo", async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId;
    
    const Goods = mongoose.model("Goods");
    let result = await Goods.findOne({ ID: goodsId}).exec();
    
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});
// 读取大类数据的接口
router.get("/getCategoryList", async (ctx) => {
  try {
    const Category = mongoose.model("Category");
    let result = await Category.find().exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});
// 读取小类的数据
router.post("/getCategorySubList", async (ctx) => {
  try {
    let cateoryId = ctx.request.body.categoryId;
    const CategorySub = mongoose.model("CategorySub");
    let result = await CategorySub.find({ MALL_CATEGORY_ID: cateoryId }).exec();
    ctx.body = { code: 200, message: result };
  } catch (error) {
    ctx.body = { code: 500, message: error };
  }
});
// 根据类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
  try{
      let categorySubId = ctx.request.body.categorySubId //小类别
      let page =ctx.request.body.page
      let num = 10 //每页显示数量
      let start = (page-1)*num
      const Goods = mongoose.model('Goods')
      let result = await Goods.find({SUB_ID:categorySubId})
      .skip(start) .limit(num).exec()
      ctx.body={code:200,message:result}
  }catch(err){
      ctx.body={code:500,message:err}
  }

})

module.exports = router;
