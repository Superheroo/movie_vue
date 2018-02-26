<template lang="html">
	<div id="index">
		<div class="header">
			<div class="left fl">
				<button class="btn" v-on:click="toggle()">
					<i class="iconfont">&#xe64d;</i>
				</button>
				<span>{{header_title}}</span>
			</div> 
			<div class="rigth fr">
				<div class="city">
					{{change_city}}
					<button class="xiala" @click="goto_city('/city','请选择城市')">
                       <i class="iconfont">&#xe607;</i>
					</button>
					<button class="person">
				<i class="iconfont">&#xe688;</i>
					</button>
				</div>

			</div>
		</div>
		<div class="side" v-show="isShow">
			<div class="side_left">
				<ul>
					<router-link to="/">
						<li v-on:click="toggle('天天电影')">首页</li>
					</router-link>
					<router-link to="/now_playing">
						<li v-on:click="toggle('天天影片')">影片</li>
					</router-link>
				</ul>
			</div>
			<div class="side_right"></div>
			<div class="shade"></div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				isShow: false,
			}
		},
		computed: {
			//计算属性，根据数据依赖变化而变化，并且数据会使用缓存的形式
			header_title: function() {
				return this.$store.state.title;
			},
			change_city:function(){
				return this.$store.state.city;
				
			}
		},
		methods: {
			toggle: function(p) {
				this.isShow = !this.isShow;
				//改变title的状态		$store.commit(自定义事件,传参)
				this.$store.commit("toggleTitle", "天天电影")
			},
			goto_city: function(p, q) {
				//通过$router.push的方法，传路径
				//和location.href的用法一致，直接传地址就可以使用了
				this.$router.push({
					path: p,
				});
				//改变title的状态   $store.commit(自定义事件，传参)
				this.$store.commit("cityTitle",q);
				this.show = false;
			}
		}
	}
</script>
<style lang="scss">
	@import "../scss/_reset.scss";
	@font-face {
		font-family: 'iconfont';
		/* project id 541913 */
		src: url('//at.alicdn.com/t/font_541913_9zbx2tn19prmgqfr.eot');
		src: url('//at.alicdn.com/t/font_541913_9zbx2tn19prmgqfr.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_541913_9zbx2tn19prmgqfr.woff') format('woff'), url('//at.alicdn.com/t/font_541913_9zbx2tn19prmgqfr.ttf') format('truetype'), url('//at.alicdn.com/t/font_541913_9zbx2tn19prmgqfr.svg#iconfont') format('svg');
	}
	
	#index {
		width: 100%;
		#Carousel {
			margin-top: 50px;
			width: 100vw;
			height: 56vw;
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
			.btn,
			.xiala,
			.person {
				height: 50px;
				background-color: transparent;
				padding: 10px;
				border-right: 1px solid gainsboro;
				.iconfont {
					font-family: "iconfont";
					font-size: 20px;
					color: white;
					font-style: normal;
				}
			}
			span,
			.city {
				color: white;
			}
		}
		.side {
			width: 100%;
			height: 100%;
			/*color: white;*/
			position: fixed;
			top: 50px;
			left: 0;
			z-index: 999;
			transition: width 1s ease-in-out;
			.side_left {
				width: 70%;
				height: 100%;
				background-color: orange;
				color: white;
				position: fixed;
				top: 50px;
				left: 0;
				a{
					color: white;
				}
				ul li {
					list-style: none;
					padding: 15px;
				}
			}
			.side_right {
				width: 30%;
				height: 100%;
				background-color: gainsboro;
				opacity: .6;
				float: right;
			}
		}
	}
</style>