<template>
	<div id="movies">
		<div class="film-list-nav">
			<router-link to="/now_playing">正在热映
			</router-link>
			<router-link to="/coming_soon">即将上映
			</router-link>
		</div> 
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">   
	.film-list-nav {
		height: 48px;
		margin: 30px auto;
		border-bottom: none;
		line-height: 48px;
		text-align: center;
		a{
			display: inline-block;
			width: 45%;
			height: 100%;
		}
		.router-link-active {
			border-bottom: 4px solid orange;
		}
	}
</style>