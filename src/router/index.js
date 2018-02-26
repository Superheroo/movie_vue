//引用vue，vue-router工具
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Index from "../views/index.vue";

import app from "../views/app.vue";

//作为引入 coming-soon.vue 文件作为路由
import coming_soon from "../views/coming_soon.vue";

import now_playing from "../views/now_playing.vue";

import movies from "../views/movies.vue";

import detail_page from "../views/detail_page.vue";
import city from "../views/city.vue";

//配置组件的路径和注册
const routes = [{
		path: "/",
		name: "app",
		component: app,
//		children: [
//			{
//				path: "/city",
//				name: "city",
//				component: city,
//			},
//		]
	},
	{
		//路由的路径
		path: "/movies",
		//路由的名称
		name: "movies",
		//vue文件作为模板引入
		component: movies,
		//一级路由的子路由
		children: [
		    {
				path: "/",
				redirect: "now_playing"
			},
			{
				path: "/now_playing",
				component: now_playing
			},
			{
				path: "/coming_soon",
				component: coming_soon
			},
		]

	},
	{
		path: "/Index",
		name: "Index",
		component: Index,
	},
	{
		path: "/detail_page",
		name: "detail_page",
		component: detail_page,
	},
	{
				path: "/city",
				name: "city",
				component: city,
			},
]

//创建vue-router的实例
//注意：Router对象的路径配置，属性名为routes，切记不要改动
const router = new Router({
	routes: routes
});
//输出给其他文件使用router对象
export default router;