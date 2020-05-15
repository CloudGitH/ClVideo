<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
  body {
    background-color: #f5f7fa;
  }
  image {
    vertical-align: top;
  }
  text {
    vertical-align: text-top;
  }
  .one-line-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .two-line-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient:vertical;
  }
  .content {
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
  }
  .ft-main-color {
    color: #2d8cf0;
  }
  .bg-main-color {
    background-color: #2d8cf0;
  }
</style>
