const mongoose = require("mongoose");
const config = require("../netConfig");
const db = "mongodb://localhost/simle-db";
const glob = require('glob');
const {resolve} = require('path');
// 一次性引入所有的Schema文件
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require);
}

exports.connect = () => {
  //连接数据库
  mongoose.connect(
    config.mongooseStr,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => console.log("MongoDB connect success")
  );
  // 最大重新连接次数
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    //把所有连接放到这里

    //增加数据库监听事件
    mongoose.connection.on("disconnected", () => {
      console.log("***********数据库断开***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        //进行重连
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
      }
    });
    //数据库出现错误的时候
    mongoose.connection.on("error", (err) => {
      console.log("***********数据库错误***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject(err);
        throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
      }
    });
    //链接打开的时
    mongoose.connection.once("open", () => {
      console.log("MongoDB connected successfully");
      resolve();
    });

  });

};
