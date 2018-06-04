#### 个人react后台管理系统

##### 技术站
`React、react-router、redux、koa2`

##### 运行
```
git clone 
npm install
cd server
npm install
cd ..
npm start
cd server
npm run dev    
```


##### 参考资料
webpack: [less-loader](https://segmentfault.com/a/1190000010162614)  
react-router: [博客](https://zhuanlan.zhihu.com/p/28585911)  
create-react-app使用antd: [博客](https://blog.csdn.net/gx15366039985/article/details/78076421?locationNum=9&fps=1)
supervisor: [博客](https://www.jianshu.com/p/6d84e5efe99d)

##### 备注
1.antd版本3.5.3,安装的时候版本号为^3.5.3,为了防止安装的时候版本不同带来的问题，这里先写死版本号  
2.webpack.config.dev.js css和less合起来写的话会报antd/lib/spin会报错，所以分开写 [参考链接](https://segmentfault.com/q/1010000010827986)
3.一开始计划Node端使用express框架，后来考虑koa2直接使用ES6/7会简单一点，所以改成了koa2
4.运行server之前要全局安装supervisor这个包

##### todo
- [ ] React-router 4.0 总结
- [x] 页面框架搭建
- [x] 前端请求方法封装（fetch 或 axios）
- [ ] 登录页开发（passport、redux、session）
- [ ] redux引入


