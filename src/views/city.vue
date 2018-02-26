<template>
	<div id="city">
		<div class="hot-city-list">
			<div class="hot_city">
				热门城市
			</div>
			<ul v-for="item in hot_cities">
				<li v-on:click="change_city('/',item)">{{item}}</li>
			</ul>
		</div>
		<mt-index-list>
			<mt-index-section v-for="(item,index) in city" :index="index">
				<li class="all_cities" v-for="c in item" @click="change_city('/',c.name)">{{c.name}}</li>
				<!--<mt-cell v-for="item in ns" :title="item.name">
				</mt-cell>-->
			</mt-index-section>
		</mt-index-list>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		created() {
			var self = this;
			axios.get("http://m.maizuo.com/v4/api/city").then(function(res) {
				var obj = {};
				var city = res.data.data.cities;
				console.log(city)
				self.$store.commit("cityTitle")
				city.forEach(function(item, index) {
					// forEach方法中的function回调有三个参数：第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
					//p为拼音首字母
					var p = item.pinyin[0];
					//					console.log(p)
					//对象["属性的字符串"]同样可以访问对象的这个属性
					//既然是可以传字符串，那么就可以动态的访问对象上的属性是否存在
					if(obj[p] == undefined) {
						//判断如果obj里面没有首字母的分类，那么就要给它一个空数组,比如字母i,o,u开头
						obj[p] = [];
					}
					//给对应的属性（分类），添加城市
					obj[p].push(item);
				})
				//				console.log(obj)

				var newArr = [];
				//排序后的数组
				newArr = Object.keys(obj).sort();
				console.log(newArr)
				var newObj = {};
				for(var i = 0; i < newArr.length; i++) {
					//给新对象按照顺序添加属性，并且在用已经分好组的旧对象上获取值
					//对象上的数据更新会让数据的顺序打乱，所以要按顺序添加
					//newArr[0]=="A"
					newObj[newArr[i]] = obj[newArr[i]];
				}
				console.log(newObj);
				//把排序之后的值给city
				self.city = newObj;

			})
		},
		data: function() {
			return {
				city: {},
				hot_cities: ["北京", "上海", "杭州", "广州", "深圳", "重庆", "成都", "南京", "武汉", "西安", "厦门", "天津", ]
			}
		},
		methods: {
			change_city: function(p,cityname) {
				console.log(11)
				this.$router.push({
					path: p,
				});
				//触发事件 带上参数
				this.$store.commit("cityTitle",cityname)
			}
		}
	}
</script>

<style lang="scss">
	.hot-city-list {
		height: 100%;
		height: auto;
		border-top: 1px solid #eaeaea;
		font-size: 0;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		.hot_city {
			width: 100%;
			height: 45px;
			line-height: 45px;
			margin-top: 50px;
			font-size: 18px;
			background: #fafafa;
		}
		li {
			float: left;
			border-radius: 2px;
			display: inline-block;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			width: 22%;
			height: 45px;
			line-height: 45px;
			border: 1px solid #eaeaea;
			background: #fff;
			color: #666;
			text-align: center;
			font-size: 18px;
		}
	}
	.all_cities{
		padding: 10px;
		display: inline-block;
		text-align: center;
		width: 25%;
		border: 1px solid gainsboro;
	}
</style>