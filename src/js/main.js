/**
 *单页应用的入口文件 
 */

import "../scss/test.scss";
//引入vue模块，用变量Vue作为模块的输出的对象存储
import Vue from "vue";

//引入index.vue作为单页应用的总模板
import Index from "../views/index.vue";
//引入vuex状态管理功能
import vuex from "../vuex/store.js";

//引入mint-ui模块
import Mint from 'mint-ui';
//引用mint-ui的样式
import 'mint-ui/lib/style.css'; 
Vue.use(Mint);


//引入vue-router 插件,在根目录运行      cnpm i vue-router --save-dev
//import Router from "vue-router";

//配置路由：获取到的vue-router实例化后的对象并赋予后面的Vue对象路由的功能
import router from "../router";

//Vue.use(router);

//引入axios插件,在根目录运行      cnpm i axios --save-dev
//类似ajax的插件
//import axios from "vue-axios";


//引入vuex插件,在根目录运行      cnpm i vuex --save-dev
//import vuex from "vuex";


//实例化Vue对象
new Vue({
	el:"#app",
	template:"<index />",
	components:{
		//组件名：组件的配置
		index:Index,
	}, 
	created:function(){
//		console.log(this)
	},
	data:{
		
	},
	//路由的功能
	router,
	//状态管理的功能
	store:vuex,
	
	
})
