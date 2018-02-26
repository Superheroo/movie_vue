import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var store = new Vuex.Store({
	//状态
	state: {
		title: "天天电影",
		city:"请选择城市",
	},
	mutations: {

		//变异（方法） 第一个参数默认是state状态不变，第二个参数是触发的时候传的参数
		toggleTitle: function(state, arg) {
			state.title = arg;
		},
		cityTitle:function(state,arg){
			state.city = arg;
		}
		
	}
})

export default store;