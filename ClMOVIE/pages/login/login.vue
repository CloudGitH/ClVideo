<template>
  <view class="content">
    <view class="login-box">
      <view class="login-title">帐号密码登录</view>
      <form @submit="subLogin" >
        <view class="input-wrap">
          <input type="text" value="" placeholder="手机号/邮箱" class="input-text border-bottom" name='username'/>
          <input type="password" value="" placeholder="密码" class="input-text" name='password'/>
        </view>
        <button form-type="submit" class="submit-btn bg-main-color ">登录</button>
      </form>
      
      <view class="other">
        <!-- #ifndef H5 || MP-WEIXIN -->
        <view class="other-title">第三方登录</view>
        <!-- #endif -->
        <view class="quick-login-wrap">
          
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
      </view>
    </view>
  </view>
</template>

<script>
  export default {
  	data() {
  		return {
        userInfo: null
  		}
  	},
  	methods: {
      // 提交表单的账号密码修改用户信息
      subLogin (e) {
        var me = this;
        var val = e.detail.value;
        var username = String(e.detail.value.username);
        var password = String(e.detail.value.password);
        
        uni.showToast({
            title: '加载中',
            icon: "loading",
            mask: true,
            duration: 5000
        });
        var me = this;
        
        me.getKeyFn().then(function(){
          me.heroReest({
            'url': 	'/user/registOrLogin?qq=' + me.getKey,
            'header' : {},
            'data': {
              username,
              password
            },
            success : function(res){
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
                uni.hideToast();
                uni.switchTab({
                  url:'../me/me'
                })
              }
            },
            complete: function() {
              
            }
          })
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
                        uni.setStorageSync('globalUser',me.userInfo);
                        uni.switchTab({
                          url:'../me/me'
                        })
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
  @import url("login.css");
</style>