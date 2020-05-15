import Vue from 'vue'
import App from './App'

Vue.prototype.getKey = ''


Vue.prototype.getKeyFn = function () {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: 'https://www.imovietrailer.com/superhero/sys/switches',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function(res) {
        Vue.prototype.getKey = res.data.ok;
        resolve()
      }
    })
  })
}

Vue.prototype.heroReest = function (obj) {
  var requestUrl = "https://www.imovietrailer.com/superhero" + obj.url;
  var requestHeader = obj.header || {'content-type': 'application/x-www-form-urlencoded'};
  var requestMethod = "POST";
  var requestSuccess = obj.success || function () {};
  var requestComplete = obj.complete || function () {};
  var requestFail = obj.fail || function () {};
  Vue.prototype.getKeyFn().then(function(){
    var requestData = {"qq": Vue.prototype.getKey};
    if( obj.data != undefined ) {
      requestData = Object.assign(requestData, obj.data);
    }
    uni.request({
      url: requestUrl,
      data: requestData,
      header: requestHeader,
      method: requestMethod,
      success: (res) => {
        requestSuccess(res)
      },
      complete: (res) => {
        requestComplete(res)
      },
      fail: (res) => {
        requestFail(res)
      }
    }) 
  })
}

Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
    ...App
})
app.$mount()
