
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/search/search","pages/me/me","pages/detail/detail","pages/detailPic/detailPic","pages/login/login","pages/setNickName/setNickName","pages/date/date","pages/sex/sex","pages/upFace/upFace"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#c3c3c3","selectedColor":"#2d8cf0","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/index.png","selectedIconPath":"static/index_sel.png","text":"首页"},{"pagePath":"pages/search/search","iconPath":"static/search.png","selectedIconPath":"static/search_sel.png","text":"搜索"},{"pagePath":"pages/me/me","iconPath":"static/me.png","selectedIconPath":"static/me_sel.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"ClMOVIE","compilerVersion":"2.6.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"ClMOVIE","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/search/search","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"搜索","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true,"titleNView":true}},{"path":"/pages/me/me","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#FFFFFF","titleNView":false}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarTitleText":"ClMOVIE","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#2d3d4c","titleNView":{"type":"transparent","buttons":[{"type":"share"},{"type":"home"}]}}},{"path":"/pages/detailPic/detailPic","meta":{},"window":{"navigationBarTitleText":"封面"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/setNickName/setNickName","meta":{},"window":{"navigationBarTitleText":"昵称","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#2d3d4c"}},{"path":"/pages/date/date","meta":{},"window":{"navigationBarTitleText":"生日","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#2d3d4c"}},{"path":"/pages/sex/sex","meta":{},"window":{"navigationBarTitleText":"性别","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#2d3d4c"}},{"path":"/pages/upFace/upFace","meta":{},"window":{"navigationBarTitleText":"头像","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#000"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
