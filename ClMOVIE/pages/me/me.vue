<template>
  <view class="content">
    <view class="me-top-bg">
      <!-- 登录注册按钮-start -->
      <view class="login-btn-wrap" v-if="login==false">
        <button class="login-btn bg-main-color" @click="toLogin">登录 / 注册</button>
      </view>
      <!-- 登录注册按钮-end -->
      
      <!-- 快捷登录图标-start -->
      <view class="quick-login-wrap" v-if="login==false">
        
        
        <!-- #ifdef MP-WEIXIN -->
        <!-- 只有在微信小程序中显示微信小程序登录 有问题先注释-->
        <!-- <view class="quick-login-item">
          <button class="wx-login" open-type="getUserInfo" @getuserinfo="mpWxLogin"></button>
        </view> -->
        <!-- 只有在微信小程序中显示微信小程序登录 有问题先注释-->
        <!-- #endif -->
        
        <!-- 只有在app中显示微信和微博登录 -->
        <!-- #ifdef APP-PLUS -->
        <view class="quick-login-item">
          <view class="wx-login" @click="appOAuthLogin('weixin')"></view>
        </view>
        <view class="quick-login-item">
          <view class="wb-login" @click="appOAuthLogin('sinaweibo')"></view>
        </view>
        <!-- #endif -->
        
        <!-- 快捷登录图标-end -->
      </view>
      
      <!-- 设置按钮-start -->
      <!-- <image src="http://www.imovietrailer.com:909/static/icos/settings.png" mode="" class="set-icon" v-if="login==true"></image> -->
      <!-- 设置按钮-end -->
      
      <!-- 登录状态-start -->
      <view class="login-yes-block" v-if="login==true">
        <image :src="userInfo.faceImage" class="login-face"></image>
        <view class="login-info-text">
          <view class="login-info-name">{{userInfo.nickname}}</view>
          <view class="login-info-small">
            <view class="login-info-sex" v-if="userInfo.sex == null">性别未设置</view>
            <view class="login-info-sex" v-else-if="userInfo.sex == 1">男</view>
            <view class="login-info-sex" v-else-if="userInfo.sex == 0">女</view>
            <view class="login-info-date">{{userInfo.birthday}}</view>
          </view>
        </view>
      </view>
      <!-- 登录状态-end -->
    </view>
    
    <!-- 我的页面列表项-start -->
    <view class="me-info-set" @click="clickFace">
      <view class="hei110">
        <view class="me-info-set-left">
          <image src="../../static/face.png" class="info-set-icon"></image>
          <view class="info-set-text">我的头像</view>
        </view>
        <!-- <image src="../../static/rightArrow.png" class="info-set-arrow"></image> -->
      </view>
    </view>

    <view class="me-info-set">
      <view class="hei110 border-bottom" @click="clickNickname">
        <view class="me-info-set-left">
          <image src="../../static/name.png" class="info-set-icon"></image>
          <view class="info-set-text">我的昵称</view>
        </view>
        <image src="../../static/rightArrow.png" class="info-set-arrow"></image>
      </view>
      <view class="hei110 border-bottom" @click="clickDate">
        <view class="me-info-set-left">
          <image src="../../static/date.png" class="info-set-icon"></image>
          <view class="info-set-text">我的生日</view>
        </view>
        <image src="../../static/rightArrow.png" class="info-set-arrow"></image>
      </view>
      <view class="hei110"  @click="clickSex">
        <view class="me-info-set-left">
          <image src="../../static/sex.png" class="info-set-icon"></image>
          <view class="info-set-text">我的性别</view>
        </view>
        <image src="../../static/rightArrow.png" class="info-set-arrow"></image>
      </view>
    </view>
    
    <view class="me-info-set" @click="exitLogin" v-if='login == true'>
      <view class="hei110">
        <view class="me-info-set-left">
          <image src="../../static/exit.png" class="info-set-icon"></image>
          <view class="info-set-text">退出登录</view>
        </view>
        <!-- <image src="../../static/rightArrow.png" class="info-set-arrow"></image> -->
      </view>
    </view>
    
    <!-- 我的页面列表项-end -->
    
  </view>
</template>

<script>
  export default {
  	data() {
  		return {
  			login: false,
        userInfo: null
  		}
  	},
    onShow() {
      var me = this;
      var userInfo = uni.getStorageSync('globalUser')
      if( userInfo != null && userInfo != undefined && userInfo != '' ) {
        me.login = true;
        me.userInfo = userInfo;
      } else {
        me.login = false;
        me.userInfo = null;
      }
    },
  	methods: {
      //点击登录按钮跳转至登录页面
      toLogin () {
        uni.navigateTo({
          url:"../login/login"
        })
      },
      
      // 点击退出登录
      exitLogin () {
        var me = this;
        uni.showModal({
            title: '提示',
            content: '是否确认退出账号',
            success: function (res) {
                if (res.confirm) {
                  me.heroReest({
                    url: 	'/user/logout',
                    data: {
                      userId: me.userInfo.id,
                    },
                    success : function(res){
                      console.log(res)
                      uni.removeStorageSync('globalUser');
                      me.login = false;
                    },
                    complete: function() {
                      
                    }
                  }) 
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      },
      // 点击头像操作
      clickFace () {
        var me = this;
        if( me.login == false ){
          uni.navigateTo({
            url:"../login/login"
          })
          return false;
        }
        uni.showActionSheet({
          itemList: ['查看我的头像','修改我的头像'],
          success: function (res) {
            if( res.tapIndex == 0 ){
              var arr = [];
              arr.push(me.userInfo.faceImage)
              uni.previewImage({
                urls: arr,
                current: 0
              })
            }
            if( res.tapIndex == 1 ){
              // 修改头像
              uni.chooseImage({
                  count: 1, //默认9
                  sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['album'], //从相册选择
                  success: function (res) {
                    uni.navigateTo({
                      url: '../upFace/upFace?file=' + res.tempFiles[0].path
                    })
                  }
              });
            }
          }
        })
      },
      // 点击昵称
      clickNickname () {
        var me = this;
        if( me.login == false ){
          uni.navigateTo({
            url:"../login/login"
          })
          return false;
        }
        uni.navigateTo({
          url:"../setNickName/setNickName"
        })
      },
      // 点击生日
      clickDate () {
        var me = this;
        if( me.login == false ){
          uni.navigateTo({
            url:"../login/login"
          })
          return false;
        }
        uni.navigateTo({
          url:"../date/date"
        })
      },
      // 点击生日
      clickSex () {
        var me = this;
        if( me.login == false ){
          uni.navigateTo({
            url:"../login/login"
          })
          return false;
        }
        uni.navigateTo({
          url:"../sex/sex"
        })
      },
      // 微信小程序快捷登录接口好像有问题暂时不处理
      mpWxLogin () {
        var me = this;
        uni.login({
          provider: 'weixin',
          success: function (loginRes) {
            uni.getUserInfo({
              provider: 'weixin',
              success: function (infoRes) {
                me.getKeyFn().then(function(){
                  me.heroReest({
                    'url': '/stu/mpWXLogin/' + loginRes.code + '?qq=' + me.getKey,
                    'header' : {},
                    'data': {
                      avatarUrl: infoRes.userInfo.avatarUrl,
                      nickName: infoRes.userInfo.nickName,
                      whichMP: 2
                    },
                    success : function(res){
                    
                    },
                    fail: function(res){
                      // uni.hideToast();
                      console.log('fail',res)
                    },
                    complete: function(res){
                      console.log('complete',res)
                    }
                  })
                })
              }
            })
          }
        })
      },
      // app登录
      appOAuthLogin(open) {
        var me = this;
        uni.showToast({
            title: '登录中',
            icon: "loading",
            mask: true,
            duration: 5000
        });
        
        uni.login({
          provider: open,
          success: function (loginRes) {
            // 获取用户信息
            uni.getUserInfo({
              provider: open,
              success: function (infoRes) {
                var face = '';
                var nickname = '';
                var openIdOrUid = ''
                if( open ==  'sinaweibo' ) {
                 face = infoRes.userInfo.avatar_large;
                 nickname = infoRes.userInfo.nickName;
                 openIdOrUid = infoRes.userInfo.id;
                }
                if( open == 'weixin' ) {
                  face = infoRes.userInfo.avatarUrl;
                  nickname = infoRes.userInfo.nickName;
                  openIdOrUid = infoRes.userInfo.openId;
                }
                me.getKeyFn().then(function(){
                  me.heroReest({
                    'url': '/appUnionLogin/' + open + '?qq=' + me.getKey,
                    'header' : {},
                    'data': {
                      face,
                      nickname,
                      openIdOrUid
                      
                    },
                    success : function(res){
                      uni.hideToast();
                      if( res.data.status == 500 ){
                        uni.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 1500,
                          mask: true
                        });
                        return false;
                      }
                      if( res.data.status == 200 ){
                        me.userInfo = res.data.data;
                        uni.setStorageSync('globalUser',me.userInfo)
                        me.login = true
                      }
                    },
                    fail: function(res){
                      uni.hideToast();
                    },
                    complete: function(res){
                      
                    }
                  })
                })
              }
            });
          }
        });
      }
      
      
  	}
  }
</script>

<style>
  @import url("me.css");
</style>
