<template>
	<div id="coming_soon">
		<div class="film-item" v-for="item in all"
			v-on:click="goto_detail(item.id)">
			<div class="film_left" v-if="loading">
				<img :src=item.poster.origin />
			</div>
			<div class="film_right">
				<div class="movies_name">
					{{item.name}}
						<i class="iconfont">&#xe630;</i>
				</div>
				<p class="movies_intro">{{item.intro}}
				</p>
				<div class="release_time">
					{{format(item.premiereAt)}}
				</div>
			</div>
		</div>
	</div>

</template>

<script type="text/javascript">
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
			
			axios.get("https://m.maizuo.com/v4/api/film/coming-soon?count=20&page=4",{
				params:{
					count: 10,
					page: 3,
				}
			}).then(function(res){
				//成功的回调
				ts.loading=true;
				//获取轮播图片
				for(var i = 0; i < res.data.data.films.length; i++) {
					var now_all = res.data.data.films[i];
					ts.all.push(now_all);
//					console.log(ts.all)

				}
			}).catch(function(err){
				
			})

		},

		data: function() {
			return {
				all: [],
				loading:false,
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
			goto_detail:function(Oid){
//					console.log(Oid)
				this.$router.push({
					
					path:"/detail_page",			//跳转路径
					query:{
						id:Oid
					}			//传参
				});
			}
		}
	}
</script>

<style lang="scss">
	
	@import "../scss/test.scss";
	/*直接编写scss*/
	
	#coming_soon {
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
						.iconfont {
							font-family: "iconfont";
							font-size: 20px;
							color: #c6c6c6;
							font-style: normal;
							float: right;
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
				.release_time{
					color: orange;
					padding-top: 13px;
				}
			}
		}
	}
	
	.film-list-nav {
		height: 48px;
		margin: 50px auto;
		border-bottom: solid orange 1px;
		.choosing {
			color: #fe6e00;
			/*border-bottom: solid;*/
		}
		.now-playing {
			float: left;
			width: 50%;
			height: 100%;
			text-align: center;
			font-size: 16px;
			line-height: 46px;
			color: #6a6a6a;
			cursor: pointer;
		}
		.coming-soon {
			float: left;
			width: 50%;
			height: 100%;
			text-align: center;
			font-size: 16px;
			line-height: 46px;
			cursor: pointer;
		}
	}
</style>