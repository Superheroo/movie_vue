<template>
    <div class="detail_page">
        <div class="img_box" v-if="loading">
            <img :src=details_all.cover.origin>
        </div>
        <div class="film_intro">
            <div class="movie_word">
                影片简介
            </div>
            <div class="director">
                <span>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演&nbsp;:&nbsp;</span>
                <span>{{details_all.director}}</span>
            </div>
            <div class="actors">
                <span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演&nbsp;:&nbsp;</span>
                <span v-for="item in details_all.actors">&nbsp;{{item.name}}&nbsp;</span>
            </div>
            <div class="language">
                <span>地区语言:</span>
                <span>{{details_all.nation}}({{details_all.language}})</span>
            </div>
            <div class="category">
                <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型&nbsp;:&nbsp;</span>
                <span>{{details_all.category}}</span>
            </div>
            <div class="premiere">
                <span>上映日期:</span>
                <span>{{format(details_all.premiereAt)}}</span>
            </div>
            <div class="synopsis">
                {{details_all.synopsis}}
            </div>
            <div class="operation">
                <button class="btn">立即购票</button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
    created: function() {
        var ts = this;
        var movies_id = this.$route.query.id;
        //			console.log(movies_id)
        axios({
            url: "https://m.maizuo.com/v4/api/film/" + movies_id,
            methods: "get",
            data: {
                count: 10,
                page: 1,
            }
        }).then(function(res) {
            console.log(res)
            ts.loading = true;
            //成功的回调
            ts.details_all = res.data.data.film;
            //              console.log(ts.details_all.name)
            ts.$store.commit("toggleTitle", ts.details_all.name)
        }).catch(function(err) {

        })
    },
    data: function() {
        return {
            details_all: {},
            loading: false,
        }
    },
    computed: {
        //计算属性，根据数据依赖变化而变化，并且数据会使用缓存的形式
        header_title: function() {
            return this.$store.state.title;
        }
    },
    methods: {
        format: function(time) {
            var now = new Date(time),
                month = now.getMonth() + 1,
                day = now.getDate();
            return month + "月" + day + "日上映";
        }
    }
}
</script>
<style lang="scss">
.img_box {
    margin-top: 50px;
    width: 100vw;
    height: 56vw;
    img {
        width: 100%;
        height: 100%;
    }
}

.film_intro {
    margin-top: 20px;
    height: 56vw;
    /*.justify{
			display: inline-block;
			width: 70px;
			white-space: normal;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: justify;
		}*/
    .movie_word {
        margin: 16px auto;
        border-left: 16px solid orange;
        font-size: 16px;
        padding-left: 4px;
    }
    .director,
    .actors,
    .language,
    .category,
    .premiere,
    {
        font-size: 12px;
        height: 18px;
        text-align: justify;
        margin-bottom: 10px;
        padding-left: 20px;
        overflow: hidden;
    }
    .synopsis {
        font-size: 12px;
        height: 18px;
        text-align: justify;
        margin-bottom: 10px;
        padding-left: 20px;
    }
    .operation {
        position: fixed;
        left: 0;
        bottom: 20px;
        width: 100%;
        text-align: center;
        .btn {
            font-size: 14px;
            min-width: 156px;
            height: 36px;
            line-height: 36px;
            border: none;
            background-color: #fe8233;
            padding: 0;
            margin: 0;
            border-radius: 18px;
            color: #fff;
            -webkit-transition: 0.5s ease;
        }
    }
}
</style>