<template>
  <view class="content">
    <image :src="cover" mode="widthFix" @longpress="downPic"></image>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        cover: ''
      }
    },
    onLoad(param) {
      var me = this;
      me.cover = param.cover
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: '#000000'
      })
      uni.setNavigationBarTitle({
          title: '封面'
      });
    },
    methods: {
      downPic () {
        // #ifdef APP-PLUS || MP
        var me = this;
        uni.showActionSheet({
            itemList: ['下载'],
            success: function (res) {
              if( res.tapIndex == 0 ){
                uni.showLoading({ 
                  title: "图片保存中...",
                  mask: true,
                })
                uni.downloadFile({
                    url: me.cover,
                    success: (result1) => {
                      if (result1.statusCode === 200) {
                        var tempFilePath = result1.tempFilePath;
                        uni.saveImageToPhotosAlbum({
                          filePath: tempFilePath,
                          success: function (result2) {
                            uni.hideLoading();
                            uni.showToast({
                              title:"保存成功",
                              duration: 2000
                            })
                          },
                          fail() {
                            uni.hideLoading();
                            uni.showToast({
                              icon: 'none',
                              title:"保存失败",
                              duration: 2000
                            })
                          },
                          complete: function() {
                          }
                        });
                        
                      }
                    }
                });
                
              }
            },
            fail: function (res) {
                console.log(res.errMsg);
            },
        });
       // #endif
      }
      
    }
  }
</script>

<style>
  @import url("detailPic.css");
</style>
