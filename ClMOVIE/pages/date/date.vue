<template>
  <view class="content">
    <input type="text" placeholder="请输入昵称" class="input-text" name='username' v-model="globalUser.birthday" disabled/>
    
    <picker mode="date" :value='globalUser.birthday' start="1900-01-01" :end="endDate" @change="bindDateChange" class="input-text picker">
    </picker>
    
    <button form-type="submit" class="submit-btn bg-main-color" @click="modifyDate">修改生日</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        globalUser: {},
        endDate: ''
      }
    },
    onLoad(param) {
      var me = this;
      me.globalUser = uni.getStorageSync('globalUser')
      
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }
      var nowDate = year + '-' + month + '-' + day;
      me.endDate = nowDate;
    },
    methods: {
      // 点击修改昵称按钮
      modifyDate() {
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
              birthday: me.globalUser.birthday
            },
            success: function(res) {
              if (res.data.status == 200) {
                uni.showToast({
                  title: '修改生日成功',
                  icon: 'none',
                  duration: 1500,
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
      // 点击日期选择器
      bindDateChange (res) {
        var me = this;
        me.globalUser.birthday = res.detail.value;
      }
      
        
    }
  }
</script>

<style>
  @import url("date.css");
</style>
