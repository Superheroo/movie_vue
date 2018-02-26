[测试连接](http://liangyingcong.gitee.io/moives_town/dist/index.html)

#蓝景技术webpack脚手架
支持最新的webpack3.4.1打包   
适用于单页应用、多页应用或vue应用
> **必须保留原始目录结构，千万不要删除任何的文件夹**

##目录说明
```
/根目录
|——src					源文件目录
	|————images			html和css要引用的图片放在此
	|————js				主要js文件存放处
	|————scss			主要的scss存放处
	|————static			静态资源，不经过webpack处理
			|——data		存放一些json数据登
			|——font		字体文件、icon文件等的存放处
			|——images	JS文件中动态引用的图片存放在此
			|——lib		html和js要引入的第三方库
	|————index.html		单页应用的html入口文件，如果多页，则多个html文件放在此目录下
|——package.json			npm相关配置
|——webpack.config.js		webpack配置文件
|——postcss.config.js		postcss配置文件(自动加前缀)		

```

##使用说明
1. 开发模式
	会开启文件监听，热更新，预览web服务
	```
	npm run dev
	```
2. 生产模式
	直接打包为最终版本文件，压缩合并图片,CSS,JS,HTML等文件
	```
	npm run build
	```
	> 注意：生成的文件，默认是必须放在根目录下访问，才可以访问成功，例如`http://bgg.com/index.html`,那你就必须把dist目录下的文件，全部放在bgg.com域名所指向的根目录

3. 纯监听模式(没预览功能)	
	```
	npm run watch
	```


##webpack.config.js配置文件说明
1. 21行可以写入需要打包为公共脚本库的文件列表,默认有`babel-polyfill`,`preload`,`jquery`,`vue`,不需要的话，把其删除即可
	```
	//html里要引入的公共文件库
	lib:["babel-polyfill", "./src/static/lib/preloadjs-0.6.2.min.js","jquery","vue"]
	```
	
2. 多页应用的话，需要增加对应的入口文件和HTML页面
	需要在15行的`entry`分支进行添加
	```
	entry: {
		//入口文件，通常一个html一个入口
		first: ["./src/js/main.js"], 		//页面1的入口
		second: ["./src/js/second.js"], //页面2的入口
	}
	```
	然后114行的配置，添加对应的html文件配置
	```
	//自动注入相关文件到
	new HtmlWebpackPlugin({
		filename: "index.html",
		title: '[name]',
		inject: true,
		chunks: ["first", "lib"],		//指定注入的入口文件
		template: "./src/index.html",
		minify: { //压缩HTML文件
			 removeComments: true, //移除HTML中的注释
			 collapseWhitespace: true, //删除空白符与换行符
			 removeAttributeQuotes: true //删除标签属性值的引号
		}
	}),
	new HtmlWebpackPlugin({
		filename: "second.html", 
		title: '[name]',
		inject: true,
		chunks: ["second", "lib"],		//指定注入的入口文件
		template: "./src/second.html",
		minify: { //压缩HTML文件
			 removeComments: true, //移除HTML中的注释
			 collapseWhitespace: true, //删除空白符与换行符
			 removeAttributeQuotes: true //删除标签属性值的引号
		}
	}),
	```








##参考文献： 
[webpack2官方](https://webpack.js.org/configuration/)      
[webpack2中文手册](http://www.css88.com/doc/webpack2/)     
[babel](http://babeljs.io/docs/usage/babelrc/)     
[postcss插件](https://github.com/postcss/postcss)   
[tinypng压缩插件](https://www.npmjs.com/package/tinypng-webpack-plugin)   

