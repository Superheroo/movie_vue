<template>
	<div id="now_playing">
		
		<div class="film-item" v-for="item in all" v-on:click="goto_detail(item.id)">
			<div class="film_left" v-if="loading">
				<img :src=item.poster.origin />
			</div>
			<div class="film_right">
				<div class="movies_name">
					{{item.name}}
					<span class="grade">{{item.grade}}
					  
						<i class="iconfont">&#xe630;</i>
					</span>
				</div>
				<p class="movies_intro">{{item.intro}}
				</p>
				<div class="movies_info">
					<span class="count">{{item.cinemaCount}}</span>
					<span class="txt">家影院上映</span>
					<span class="count">{{item.watchCount}}</span>
					<span class="txt">人购票 </span>
				</div>
			</div>
		</div>

	</div>
</template>

<script type="text/javascript">
	//js
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
			axios.get("https://m.maizuo.com/v4/api/film/now-playing",{
				params:{
					count: 10,
					page: 1,
				}
			}).then(function(res) {
					//成功的回调
				ts.loading = true;
				//获取轮播图片
				for(var i = 0; i < res.data.data.films.length; i++) {
					var now_all = res.data.data.films[i];
					ts.all.push(now_all);
					var id = res.data.data.films[i].id;
					ts.moives_id.push(id);

				}
			}).catch(function(err) {
					console.log(err);
				});
				
			

		},

		data: function() {
			return {
				all: [],
				moives_id: [],
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
	@font-face {
		font-family: 'iconfont';
		/* project id 541913 */
		src: url('//at.alicdn.com/t/font_541913_3w6xpu84my5mte29.eot');
		src: url('//at.alicdn.com/t/font_541913_3w6xpu84my5mte29.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_541913_3w6xpu84my5mte29.woff') format('woff'), url('//at.alicdn.com/t/font_541913_3w6xpu84my5mte29.ttf') format('truetype'), url('//at.alicdn.com/t/font_541913_3w6xpu84my5mte29.svg#iconfont') format('svg');
	}
	
	#now_playing {
		position: absolute;
		top: 52px;
		bottom: 0;
		left: 0;
		right: 0;
		/*color: orange;*/
		height: 100%;
		.film-item {
			width: 90%;
			height: 95px;
			padding: 20px;
			border-bottom: dashed 2px orange;
			cursor: pointer;
			.film_left {
				width: 60px;
				height: 100px;
				margin-right: 10px;
				float: left;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.film_right {
				width: 75%;
				height: 100px;
				float: left;
				.movies_name {
					font-size: 16px;
					line-height: 32px;
					color: #000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					.grade {
						color: orange;
						font-size: 18px;
						float: right;
						.iconfont {
							font-family: "iconfont";
							font-size: 20px;
							color: #c6c6c6;
							font-style: normal;
						}
					}
				}
				.movies_intro {
					padding-top: 5px;
					height: 24px;
					line-height: 24px;
					color: #8e8e8e;
					font-size: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 100%;
					display: inline-block;
				}
				.movies_info {
					font-size: 14px;
					padding-top: 5px;
					.count{
						color: orange;
					}
					.txt {
						color: #8e8e8e;
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>