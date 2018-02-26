<template>

	<div id="app">
		<div id="Carousel">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="item in All_one">
					<img :src=item.cover.origin alt="" />
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="movies" v-for="item in All_one" v-on:click="goto_detail(item.id)">
			<div class="movies_top" v-if="loading">
				<!--详情图片-->
				<img :src=item.cover.origin alt="" />
			</div>
			<div class="movies_buttom">
				<div class="left fl">
					<!--电影名-->
					<p class="name">{{item.name}}</p>
					<!--电影介绍-->
					<p class="movies_intro">
						<span>{{item.cinemaCount}}</span>
						<span class="txt">家影院上映</span>
						<span>{{item.watchCount}}</span>
						<span class="txt">人购票 </span>
					</p>
				</div>
				<div class="right fr">
					<!--电影评分-->
					<p class="grade">{{item.grade}}</p>
				</div>
			</div>
		</div>
		<router-link to="/now_playing">
			<div class="more_button">更多即将上映电影</div>
		</router-link>
		<div class="dividing_line">
			<div class="upcoming">即将上映</div>
		</div>

		<div class="movies" v-for="item in All_two" v-on:click="goto_detail(item.id)">
			<div class="movies_top" v-if="loading">
				<!--详情图片-->
				<img :src=item.cover.origin alt="" />
			</div>
			<div class="movies_buttom">
				<div class="left fl">
					<p class="name">{{item.name}}</p>
				</div>
				<div class="right fr">
					<!--电影时间戳-->
					<p class="watching">{{format(item.premiereAt)}}</p>
				</div>
			</div>
		</div>
		<router-link to="/coming_soon">
			<div class="more_button">更多即将上映电影</div>
		</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	//js
//	多个变量分别引入
//	import { b1 as yl, b2 as gp} from "../js/b.js";
//	console.log(yl,gp);
//	yl.fun();
//	gp.fun();
//引入axios插件
import axios from "axios";

	export default {
		//		computed:{
		//			//计算属性，根据数据依赖变化而变化，并且数据会使用缓存的形式
		//			header_title:function(){
		//				return this.$store.state.title;
		//			}
		//		}
		created: function() {
			//当index被引入渲染时，就开始发起请求
			var ts = this;

			axios({
				url: "https://m.maizuo.com/v4/api/film/now-playing",
				methods: "get",
				data: {
					count: 10,
					page: 1,
				}
			}).then(function(res) {
				//成功的回调
				ts.loading = true;

				//获取轮播图片
				for(var i = 0; i < res.data.data.films.length; i++) {
					var all_msg = res.data.data.films[i];
					ts.All_one.push(all_msg);
					//					console.log(ts.All_one[0])

				}

			}).catch(function(err) {
				//失败的回调
				console.log(err);
			});

			axios({
				url: "https://m.maizuo.com/v4/api/film/coming-soon?count=5&page=1",
				methods: "get",
				data: {
					count: 10,
					page: 1,
				}
			}).then(function(res) {
				//成功的回调

				//获取轮播图片
				for(var i = 0; i < res.data.data.films.length; i++) {
					var all_msg = res.data.data.films[i];
					ts.All_two.push(all_msg);
					//					console.log(ts.All_two)

				}
			}).catch(function(err) {
				//失败的回调
				console.log(err);
			})

		},

		data: function() {
			return {
				All_one: [],
				All_two: [],
				loading: false,
			}

		},
		methods: {
			format: function(time) {
				var now = new Date(time),
					year = now.getFullYear(),
					month = now.getMonth() + 1,
					day = now.getDate();
				return month + "月" + day + "日上映";
			},
			goto_detail: function(Oid) {
				//					console.log(Oid)
				this.$router.push({

					path: "/detail_page", //跳转路径
					query: {
						id: Oid
					} //传参
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../scss/_reset.scss";
	#app {
		width: 100%;
		#Carousel {
			margin-top: 50px;
			width: 100vw;
			height: 56vw;
			/*.mt-spinner{
				position: absolute;
				top: 50%;
				left: 50%;
				transform:translate(-50%,-50%);
			}*/
		}
		.header {
			position: fixed;
			top: 0;
			left: 0;
			height: 50px;
			width: 100%;
			background-color: orange;
			z-index: 22;
			.icon-arrow-up {
				font-size: 30px;
			}
			span {
				color: white;
			}
		}
		.movies {
			width: 90vw;
			height: 65vw;
			border: 2px solid gray;
			border-radius: 5px;
			box-shadow: 2px 2px 2px solid red;
			margin: 10px auto;
			.movies_top {
				height: 80%;
				img {
					height: 100%;
					width: 100%;
				}
			}
			.movies_buttom {
				height: 20%;
				background-color: orange;
				.left {
					.name {
						color: black;
						padding-left: 10px;
						padding-top: 10px;
					}
					.movies_intro {
						color: gray;
						padding-left: 10px;
						font-size: 13px;
						/*padding-top:10px;*/
					}
				}
				.right {
					.grade {
						padding-top: 15px;
						padding-right: 15px;
						font-size: 24px;
					}
					.watching {
						font-size: 12px;
						padding: 15px 10px;
					}
				}
			}
		}
		.more_button {
			width: 160px;
			height: 30px;
			border: 1px solid orange;
			border-radius: 15px;
			margin: 10px auto 30px;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			color: black;
			cursor: pointer;
		}
		.dividing_line {
			position: relative;
			margin-top: 30px;
			margin-bottom: 30px;
			border-bottom: 1px solid orange;
			.upcoming {
				width: 65px;
				height: 20px;
				margin: 0 auto;
				margin-bottom: -10px;
				border-radius: 5px;
				font-size: 10px;
				line-height: 20px;
				text-align: center;
				color: black;
				background-color: orange;
			}
		}
	}
</style>