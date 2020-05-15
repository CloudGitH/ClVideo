<template>
  <view class="content">
    <radio-group @change="radioChange">
        <view class="radio-box">
          <label class="radio-wrap">
            <radio value="1" :checked="sex == '1'"/>
            <text>男</text>
          </label>
          <label class="radio-wrap">
            <radio value="0" :checked="sex == '0'"/>
            <text>女</text>
          </label>
        </view>
    </radio-group>
    
    <button form-type="submit" class="submit-btn bg-main-color" @click="modifySex">提交修改</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        globalUser: {},
        sex: '-1'
      }
    },
    onLoad(param) {
      var me = this;
      me.globalUser = uni.getStorageSync('globalUser');
      me.sex = me.globalUser.sex;
    },
    methods: {
      // 点击修改昵称按钮
      modifySex() {
        var me = this;
        me.getKeyFn().then(function() {
          me.heroReest({
            'url': '/user/modifyUserinfo?qq=' + me.getKey,
            header: {
              "headerUserId": me.globalUser.id,
              "headerUserToken": me.globalUser.userUniqueToken
            },
            'data': {
              userId: me.globalUser.id,
              sex: me.sex
            },
            success: function(res) {
              if (res.data.status == 200) {
                uni.showToast({
                  title: '修改成功',
                  icon: 'none',
                  duration: 1000,
                  mask: true
                })
                me.globalUser = res.data.data
                uni.setStorageSync('globalUser', res.data.data)
              } else {
                uni.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: true
                })
              }

            }
          })
        })
      },
      // 修改性别单选框后
      radioChange (res) {
        var me = this;
        me.sex = res.detail.value;
        console.log(me.sex)
      }
        
    }
  }
</script>

<style>
  @import url("sex.css");
</style>
