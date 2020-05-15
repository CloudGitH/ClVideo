<template>
  <view class="content">
    <input type="text" placeholder="请输入昵称" class="input-text" name='username' v-model="globalUser.nickname"/>
    <button form-type="submit" class="submit-btn bg-main-color" @click="modifyNickName">修改昵称</button>
  </view>
</template>

<script>
  export default {
  	data() {
  		return {
        globalUser: {}
  		}
  	},
    onLoad(param) {
      var me = this;
      me.globalUser = uni.getStorageSync('globalUser')
    },
    methods: {
      // 点击修改昵称按钮
      modifyNickName () {
        var me = this;
        
        me.getKeyFn().then(function(){
          me.heroReest({
            'url': 	'/user/modifyUserinfo?qq=' +  me.getKey,
            header: {
              "headerUserId": me.globalUser.id,
              "headerUserToken": me.globalUser.userUniqueToken
            },
            'data': {
              userId: me.globalUser.id,
              nickname: me.globalUser.nickname
            },
            success : function(res){
              console.log(res)
              if( res.data.status == 200 ){
                uni.showToast({
                  title: '昵称修改成功',
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
                me.globalUser = res.data.data
                uni.setStorageSync('globalUser',res.data.data)
              }
              
            },
            complete: function() {
              
            }
          }) 
        })
      }
      
    }
  }
</script>

<style>
  @import url("setNickName.css");
</style>
