<template>
  <view class="content">
    <!-- 顶部搜索框-start -->
    <view class="flex-box">
      <view class="search-wrap">
        <image src="http://www.imovietrailer.com:909/static/icos/search.png" class="search-icon"></image>
        <input type="text" value="" placeholder="找预告" class="search-input" maxlength="18" v-model="keywords" @confirm="sendSearch"/>
      </view>
    </view>
    <!-- 顶部搜索框-end -->
    
    <!-- 搜索列表-start -->
    <view class="search-list">
      <view class="search-item" v-for="(item ,index) in searchListData" :key='item.id' @click="toDetailPage(item.id)">
        <image :src="item.cover" class="search-item-img"></image>
      </view>
    </view>
    <!-- 搜索列表-end -->
  </view>
</template>

<script>
  export default {
  	data() {
  		return {
  			searchListData: [],
        keywords: '',
        page: 0,
        pageSize: 15,
        totolPage: 1
  		}
  	},
    onLoad() {
      this.getSearchListData();
    },
    onPullDownRefresh() {
      this.getSearchListData();
    },
    onReachBottom() {
      var me = this;
      me.page = me.page+1;
      if( me.page > me.totolPage ) {
        return false;
      }
      me.sendSearch(1)
    },
  	methods: {
      // 请求搜索页默认数据
      getSearchListData () {
        uni.showToast({
            title: '加载中',
            icon: "loading",
            mask: true,
            duration: 5000
        });
        var me = this;
        me.keywords = '';
        me.noticeHeroData = [];
        me.heroReest({
          'url': '/search/list',
          'data': {
            'keywords': '',
            'page': '',
            'pageSize': ''
          },
          success : function(res){
            if( res.data.status == 200 ){
              me.searchListData = res.data.data.rows;
            }
          },
          complete: function() {
            uni.stopPullDownRefresh()
            uni.hideToast()
          }
        })
      },
      // 发送搜索内容
      sendSearch (cancatArr) {
        uni.showToast({
            title: '加载中',
            icon: "loading",
            mask: true,
            duration: 5000
        });
        var me = this;
        if( cancatArr != 1 ){
          me.page = 1;
        }
        me.noticeHeroData = [];
        // return false;
        me.heroReest({
          'url': '/search/list',
          'data': {
            'keywords': me.keywords,
            'page': me.page,
            'pageSize': me.pageSize
          },
          success : function(res){
            if( res.data.status == 200 ){
              var resData = res.data.data.rows;
              if( cancatArr == 1 ){
                me.searchListData.push(...resData)
              } else {
                me.searchListData = resData;
              }
              me.totolPage = res.data.data.total;
            }
          },
          complete: function() {
            uni.hideToast();
          }
        })
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
  @import url("search.css");
</style>