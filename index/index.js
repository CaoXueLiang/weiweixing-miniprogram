/*
 * @Author: your title
 * @Date: 2020-01-15 14:20:52
 * @LastEditTime : 2020-01-16 15:26:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/index/index.js
 */

let CommonManager = require("../utils/managerHelper.js");
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 0,
    longitude: 0,
    markers:[],
    showMap:false,
    subKey: 'FEABZ-DL7CW-RAPRE-RBZXF-ATOO7-R6BRP',
    selectedMarker:{},
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },

 onLoad:function(){
   /**开始地图定位 */
   CommonManager.QQMAPLocation().then(res => {
     console.log(JSON.stringify(res));
     let tmpMarker = [
     {"id":"1","zIndex":1,"latitude":"39.921","longitude":"116.443","iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":"金宝贝早教中心(顺义中心)","color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},},
     {"id":"3","zIndex":1,"latitude":"39.922","longitude":"116.444","iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":"北京国艺书画艺术教育中心","color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},},
     {"id":"4","zIndex":1,"latitude":"39.923","longitude":"116.445","iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":"乐博机器人","color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},},
     {"id":"6","zIndex":1,"latitude":"39.924","longitude":"116.446","iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":"汉翔书法（崇文门店）","color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},},
     {"id":"7","zIndex":1,"latitude":"39.9217","longitude":"116.442","iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":"美国悦宝园早教(崇文新活馆中心)","color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},},
     {"id":"8","zIndex":1,"latitude":"39.9218","longitude":"116.441","iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":"北斗星艺术（崇文门校区）","color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},},
     {"id":"9","zIndex":1,"latitude":"39.9219","longitude":"116.447","iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":"真绘画Real Painting艺术沙龙","color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},},
     ]
    this.setData({
       latitude: res.result.location.lat,
       longitude: res.result.location.lng,
       markers: tmpMarker,
       selectedMarker: tmpMarker[0],
       showMap: true,
     })
     this.moveToLocation();
   })
 },

 
 /**
  * 小程序调用扫码
  * 允许从相机和相册扫码
  */
 scanCode(){
  wx.scanCode({
    success (res) {
      console.log('扫码结果' + JSON.stringify(res))
    },
    fail(res){
      wx.showToast({
        icon: 'none',
        title:res.errMsg,
      });
    },
  })
},


 /**
  * 获取当前地图中心的经纬度
  */
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log('拖动经纬度'+JSON.stringify(res))
      },
    })
  },

  /**
   * 将地图中心移置当前定位点，此时需设置地图组件 show-location 为true。'2.8.0' 起支持将地图中心移动到指定位置。
   */
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  /**
   * 地图拖动时的回调
   * @param {*} e 
   */
  bindregionchangeMenthod: function (e) {
    console.log("地图拖动"+JSON.stringify(e));
    var that = this
    if (e.type == "begin") {
      console.log("begin");
    } else if (e.type == "end") {
      this.getCenterLocation();
    }
  },

  /**
   * 点击marker时显示
   * @param {*} e 
   */
  markertap:function(e){
    // markerId
    console.log('点击marker'+JSON.stringify(e));
    // for (let index = 0; index < this.data.markers.length; index++) {
    //   let element = this.data.markers[index];
    //   if (e.markerId == element.id) {
    //     element.width = 40;
    //     element.height = 40;
    //   }else{
    //     element.width = 30;
    //     element.height = 30;
    //   }
    // }
    // this.setData({
    //   markers:this.data.markers
    // })
  },
})
