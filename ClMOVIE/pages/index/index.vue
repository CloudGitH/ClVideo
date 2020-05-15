<template>
  <view class="content">
    
    <!-- 首页banner-start -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular indicator-active-color="#2d8cf0" class="banner-swiper">
      <swiper-item v-for="(item ,index) in bannerData" :key="item.movieId" @click="toDetailPage(item.movieId)">
          <image :src="item.image" class="banner-img"></image>
      </swiper-item>
    </swiper>
    <!-- 首页banner-end -->
    
    <!-- 热门超英-start -->
    <view class="module-wrap">
      <view class="module-title">
        <image class="module-icon" src="http://www.imovietrailer.com:909/static/icos/hot.png"></image>
        <view class="module-desc">热门超英</view>
      </view>
      <scroll-view scroll-x class="popular-hero-list">
        <view class="popular-hero-item" v-for="(item ,index) in popularHeroData" :key="item.id" @click="toDetailPage(item.id)">
          <image :src="item.cover" class="popular-hero-img"></image>
          <view class="popular-hero-name">{{item.name}}</view>
          <fraction :mark="item.score" showNum="1"></fraction>
        </view>
      </scroll-view>
    </view>
    <!-- 热门超英-end -->
    
    <!-- 预告超英-start -->
    <view class="module-wrap">
      <view class="module-title">
        <image class="module-icon" src="http://www.imovietrailer.com:909/static/icos/hot.png"></image>
        <view class="module-desc">热门预告</view>
      </view>
      <view class="notice-hero-list">
        <view class="notice-hero-item" v-for="(item ,index) in noticeHeroData" :key="item.id">
          <video :src="item.trailer" :poster="item.poster" class="notice-hero-video" :id="item.id" @play="noticeHeroVideoPlay(item.id)" v-if='showVideo'></video>
        </view>
      </view>
    </view>
    <!-- 预告超英-end -->
    
    <!-- 猜你喜欢超英-start -->
    <view class="module-wrap">
      <view class="module-title">
        <image class="module-icon" src="http://www.imovietrailer.com:909/static/icos/hot.png"></image>
        <view class="module-desc">猜你喜欢</view>
      </view>
      <view class="guess-hero-love">
        <view class="guess-hero-love-item" v-for="(item ,gindex) in guessHeroLoveData" :key="item.name">
          <image :src="item.cover" class="guess-hero-love-img" @click="toDetailPage(item.id)"></image>
          <view class="guess-hero-love-desc"  @click="toDetailPage(item.id)">
            <view class="guess-hero-love-name one-line-text">{{item.name}}</view>
            <fraction :mark='item.score' showNum="1"></fraction>
            <view class="guess-hero-love-info two-line-text">{{item.basicInfo}}</view>
            <view class="guess-hero-love-info two-line-text">{{item.releaseDate}}</view>
          </view>
          <view class="guess-hero-love-praise" :data-indexdata="gindex"  @click="startAnimation">
            <image src="http://www.imovietrailer.com:909/static/icos/praise.png" mode="" class="guess-hero-love-praise-img"></image>
            <text class="guess-hero-love-praise-text">赞一下</text>
            <view id="animation" :animation="animationDataArr[gindex]">+1</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 猜你喜欢超英-start -->
  </view>
</template>

<script>
  import fraction from '../../componets/fraction.vue';
	export default {
		data() {
			return {
        showVideo: false,
				bannerData: [],
        popularHeroData: [],
        noticeHeroData: [],
        guessHeroLoveData: [],
        animationData: {},
        lastVideoId: '',
        animationDataArr: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {}
        }
			}
		},
    components: {
      fraction
    },
		onLoad() {
      this.getBanner();
      this.getPopularHeroData();
      this.getNoticeHeroData();
      this.getGuessHeroLoveData();
		},
    onPullDownRefresh() {
      this.getGuessHeroLoveData('1');
    },
    onShow() {
      var info = uni.getStorageSync('globalUser');
      if(info.id == '20042402382S223C') {
        this.showVideo = true
      }
      console.log('.......',info)
    },
    onHide() {
      this.animationDataArr = {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {}
      };
      
      if( this.lastVideoId != '' ){
        console.log('有videoContext')
        // 切换页面停止视频有问题
        this.videoContext = uni.createVideoContext(this.lastVideoId)
        this.videoContext.stop()
      }
    },
		methods: {
      // 请求首页轮播图数据
      getBanner () {
        var me = this;
        this.bannerData = [];
        this.heroReest({
          'url': '/index/carousel/list',
          success : function(res){
            if( res.data.status == 200 ){
              me.bannerData = res.data.data;
            }
          }
        })
      },
      // 请求热门超英数据
      getPopularHeroData () {
        var me = this;
        this.popularHeroData = [];
        this.heroReest({
          'url': '/index/movie/hot',
          'data': {
            'type': "superhero"
          },
          success : function(res){
            if( res.data.status == 200 ){
              me.popularHeroData = res.data.data;
            }
          }
        })
      },
      // 请求热门预告数据
      getNoticeHeroData () {
        var me = this;
        this.noticeHeroData = [];
        this.heroReest({
          'url': '/index/movie/hot',
          'data': {
            'type': "trailer"
          },
          success : function(res){
            if( res.data.status == 200 ){
              me.noticeHeroData = res.data.data;
            }
          }
        })
      },
      // 请求猜你喜欢数据
      getGuessHeroLoveData (param) {
        if(param == '1'){
          uni.showToast({
              title: '加载中',
              icon: "loading",
              mask: true,
              duration: 5000
          });
        }
        var me = this;
        this.guessHeroLoveData = [];
        this.heroReest({
          'url': '/index/guessULike',
          success : function(res){
            if( res.data.status == 200 ){
              me.guessHeroLoveData = res.data.data;
            }
          },
          complete: function() {
            uni.hideToast();
            uni.stopPullDownRefresh();
          }
        })
      },
      // 点击点赞按钮执行动画
      startAnimation (e) {
        // #ifdef APP-PLUS || MP-WEIXIN
        console.log(6666)
        this.animation = uni.createAnimation()
        var indexData = e.currentTarget.dataset.indexdata;
        var numTopPosition = 0;
        uni.getSystemInfo({
            success: function (res) {
             numTopPosition = -(120 / 750 * res.windowWidth);
            }
        })
        this.animation.opacity(1).translateY(numTopPosition).step({duration: 300});
        this.animationData =  this.animation;
        this.animationDataArr[indexData] = this.animationData.export();
        setTimeout(function() {
          this.animation.opacity(0).translateY(0).step({duration: 0});
          this.animationData =  this.animation;
          this.animationDataArr[indexData] = this.animationData.export();
        }.bind(this), 350)
        // #endif
      },
      // 热门预告视频播放时暂停其他视频
      noticeHeroVideoPlay (id) {
        for(var i=0; i<this.noticeHeroData.length; i++ ){
          var currentId = this.noticeHeroData[i].id;
          if( currentId != id ){
           this.videoContext = uni.createVideoContext(currentId)
           this.videoContext.pause()
          }
        }
        this.lastVideoId = id;
      },
      // 跳转至详情页
      toDetailPage (id) {
        uni.navigateTo({
            url: '../detail/detail?trailerId=' + id
        });
      }
      
		}
	}
</script>

<style>
	@import url("index.css");
</style>
