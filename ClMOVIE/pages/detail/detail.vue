<template>
  <view class="content" v-if="detailData != null">
    <!-- 预告视频-start -->
    <view class="detail-movie-wrap">
      <video id='onlyVideo' :src="detailData.trailer" controls class="detail-movie" :poster="detailData.poster" v-if="showVideo"></video>
    </view>
    <!-- 预告视频-end -->
    
    <!-- 预告视频信息-start -->
    <view class="detail-movie-info">
      <image :src="detailData.cover" class='detail-movie-cover' @click="toDetailPicPage(detailData.cover)"></image>
      <view class="detail-movie-text-box">
        <view class="detail-movie-name">{{detailData.name}}</view>
        <view class="detail-movie-text-detail">{{detailData.basicInfo}}</view>
        <view class="detail-movie-text-detail">{{detailData.originalName}}</view>
        <view class="detail-movie-text-detail">{{detailData.releaseDate}}</view>
        <view class="detail-movie-text-detail">{{detailData.totalTime}}</view>
        <view class="detail-movie-score-block">
          <view class="score-block-left">
            <view class="t1">综合评分:</view>
            <view class="t2">{{detailData.score}}</view>
          </view>
          <view class="score-block-right">
            <block v-if='detailData.score >= 0'>
              <fraction :mark='detailData.score' showNum="0"></fraction>
            </block>
            <view class="t2">{{detailData.prisedCounts}}人觉得赞</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 预告视频信息-end -->
    
    <!-- 分割线-start -->
    <view class="line-wrpa">
      <view class="line"></view>
    </view>
    <!-- 分割线-end -->
    
    <!-- 剧情介绍-start -->
    <view class="movie-block">
      <view class="movie-title">剧情介绍</view>
      <view class="movie-introduce-content">{{detailData.plotDesc}}</view>
    </view>
    <!-- 剧情介绍-end -->
    
    <!-- 演职人员-start -->
    <view class="">
      <view class="movie-title PL">演职人员</view>
      <scroll-view scroll-x="true" class="personnel-list">
        <view class="personnel-item-box" v-for="(item ,index) in directorlData" :key='item.staffId'>
          <view class="personnel-item">
            <image :src="item.photo" class="personnel-img" @click="previewPersonnePics(index)"></image>
            <view class="personnel-item-name one-line-text">{{item.name}}</view>
            <view class="item-action-name">{{item.actName}}</view>
          </view>
        </view>
        <view class="personnel-item-box" v-for="(item ,index) in performerData" :key='item.staffId'>
          <view class="personnel-item">
            <image :src="item.photo" class="personnel-img"  @click="previewPersonnePics(index + directorlData.length)"></image>
            <view class="personnel-item-name one-line-text">{{item.name}}</view>
            <view class="item-action-name">饰{{item.actName}}</view>
          </view>
        </view>
        
      </scroll-view>
    </view>
    <!-- 演职人员-end -->
    
    <!-- 剧照-start -->
    <view class="">
      <view class="movie-title PL">演职人员</view>
      <scroll-view scroll-x="true" class="personnel-list">
        <image class='plot-img':src="item" mode="aspectFill" v-for='(item ,index) in detailData.plotPics' :key='index' @click="previewPlotPics(index)"></image>
      </scroll-view>
    </view>
    <!-- 剧照-end -->
    
  </view>
</template>

<script>
  import fraction from '../../componets/fraction.vue';
  export default {
    data() {
      return {
        showVideo: false,
        trailerId: '',
        directorlData: null,
        performerData: null,
        detailData: null
      }
    },
    components: {
      fraction
    },
    onLoad(param) {
      this.trailerId = param.trailerId;
      this.getDetailData();
      this.getDirectorlData();
      this.getPerformerData();
      uni.createVideoContext('onlyVideo')
    },
    onShow() {
      var info = uni.getStorageSync('globalUser');
      if(info.id == '20042402382S223C') {
        this.showVideo = true
      }
    },
    onHide() {
      
      var me = this;
      if( me.videoContext ){
        console.log('有videoContext')
        me.videoContext.stop()
      }
    },
    // 微信小程序自带的分享触发
    onShareAppMessage(res) {
      var me = this;
      return {
        title: '来自ClMOIVE的电影 {' + me.detailData.name + '}',
        path: '/pages/detail/detail?trailerId=' + me.trailerId
      }
    },
    // 导航栏自定义的按钮事件监听
    onNavigationBarButtonTap(e) {
      var me = this;
      if( e.type == 'home' ) {
        uni.switchTab({
          url:"../index/index"
        })
      }
      if( e.type=="share" ) {
        uni.share({
            provider: "weixin",
            scene: "WXSenceTimeline",
            type: 0,
            href: "http://www.imovietrailer.com/#/pages/movie/movie?trailerId=" + me.trailerId,
            title: '来自ClMOIVE的电影 {' + me.detailData.name + '}',
            imageUrl: me.detailData.poster,
            summary: me.detailData.plotDesc.substr(0,20) + '.....',
            success: function (res) {
                console.log("success:" + JSON.stringify(res));
            },
            fail: function (err) {
                console.log("fail:" + JSON.stringify(err));
            }
        });
      }
    },
    methods: {
      // 请求预告页详情
      getDetailData () {
        uni.showToast({
            title: '加载中',
            icon: "loading",
            mask: true,
            duration: 5000
        });
        var me = this;
        me.heroReest({
          'url': '/search/trailer/' + me.trailerId,
          'data': {
            'trailerId': me.trailerId
          },
          success : function(res){
            if( res.data.status == 200 ){
              me.detailData = res.data.data;
              me.detailData.plotPics = JSON.parse(me.detailData.plotPics)
            }
          },
          complete: function() {
            uni.hideToast()
          }
        })
      },
      // 请求导演数据
      getDirectorlData () {
        // uni.showToast({
        //     title: '加载中',
        //     icon: "loading",
        //     mask: true,
        //     duration: 5000
        // });
        var me = this;
        me.heroReest({
          'url': '/search/staff/' + me.trailerId + '/1',
          'data': {
            'trailerId': me.trailerId,
            "role": 1
          },
          success : function(res){
            if( res.data.status == 200 ){
              me.directorlData = res.data.data;
            }
          },
          complete: function() {
            // uni.hideToast()
          }
        })
      },
      //请求演员数据
       getPerformerData () {
         // uni.showToast({
         //     title: '加载中',
         //     icon: "loading",
         //     mask: true,
         //     duration: 5000
         // });
         var me = this;
         me.heroReest({
           'url': '/search/staff/' + me.trailerId + '/2',
           'data': {
             'trailerId': me.trailerId,
             "role": 2
           },
           success : function(res){
             if( res.data.status == 200 ){
               me.performerData = res.data.data;
             }
           },
           complete: function() {
             // uni.hideToast()
           }
         })
       },
       // 点击剧照进行预览
       previewPlotPics (index) {
         var me = this;
         uni.previewImage({
           urls: me.detailData.plotPics,
           current: index
         })
       },
       // 点击演职人员图片进行预览
       previewPersonnePics (index) {
         var me = this;
         var previewAllArr = []
         me.directorlData.forEach( (item)=> {
           previewAllArr.push(item.photo)
         })
         me.performerData.forEach( (item)=> {
           previewAllArr.push(item.photo)
         })
         uni.previewImage({
           urls: previewAllArr,
           current: index
         })
       },
       // 跳转至影片封面操作页面
       toDetailPicPage (cover) {
         uni.navigateTo({
           url:"../detailPic/detailPic?cover=" + cover
         })
       }
      
    }
  }
</script>

<style>
  @import url("detail.css");
</style>
