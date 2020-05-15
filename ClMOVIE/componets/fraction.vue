<template name="fraction">
  <view class="fraction-wrap">
    <image src="http://www.imovietrailer.com:909/static/icos/star-yellow.png" v-for="(item1,index1) in brightStart" :key="brightStart.id" class="fraction-img"></image>
    <image src="http://www.imovietrailer.com:909/static/icos/star-gray.png" v-for="(item2,index2) in darkStart" :key="darkStart.id" class="fraction-img"></image>
    <text class="fraction-number" v-if="showNum == '1' ? true : false">{{mark}}</text>
  </view>
</template>

<script>
  export default {
    name: 'fraction',
    props: ["mark","showNum"],
  	data() {
  		return {
        brightStart: [],
        darkStart: []
  		}
  	},
    created() {
      this.calcStart()
    },
  	methods: {
      calcStart() {
        var me = this;
        var brightStartLen = parseInt(me.mark / 2);
        var darkStartLen = 5 - brightStartLen;
        for(var i=0; i<brightStartLen; i++){
          me.brightStart.push({id: 'bright' + i})
        }
        for( var j=0; j<darkStartLen; j++ ){
          me.darkStart.push({id: 'darkStart' + j})
        }
      }
  	}
  }
</script>

<style>
  .fraction-wrap {
    height: 24rpx;
    margin: 10rpx 0 6rpx;
  }
  .fraction-img {
    display: inline-block;
    width: 18rpx;
    height: 18rpx;
    padding: 3rpx 0;
  }
  .fraction-number {
    font-size: 24rpx;
    line-height: 24rpx;
    padding-left: 10rpx;
    color: #c3c3c3;
  }
</style>
