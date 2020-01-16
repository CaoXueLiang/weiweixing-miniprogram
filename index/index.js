/*
 * @Author: your title
 * @Date: 2020-01-15 14:20:52
 * @LastEditTime : 2020-01-16 17:26:59
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
    showBottom:false,
    subKey: 'FEABZ-DL7CW-RAPRE-RBZXF-ATOO7-R6BRP',
    selectedMarker:{},
    allData:[],
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },

 onLoad:function(){
   /**开始地图定位 */
   CommonManager.QQMAPLocation().then(res => {
     console.log(JSON.stringify(res));
    this.setData({
       latitude: res.result.location.lat,
       longitude: res.result.location.lng,
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
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log('拖动经纬度'+JSON.stringify(res))
        // 拖拽后进行修改
        CommonManager.QQMAPSearch('商场',res.latitude,res.longitude).then(res => {
          console.log(JSON.stringify(res));
          var tmpMarker = [];
          var tmpData = [];
          for (let index = 0; index < res.data.length; index++) {
            let element = res.data[index];
            element['tagArray'] = element.category.split(":");
            let oneMarker = {"id":element.id,"latitude":element.location.lat,"longitude":element.location.lng,"iconPath":"https://tcjy.tangchaotv.cn/asset//index/marker_yellow2.png","width":30,"height":30,"callout":{"content":element.title,"color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},};
            tmpMarker.push(oneMarker);
            tmpData.push(element);
          }
          that.setData({
            markers:tmpMarker,
            allData:tmpData,
          });
        })
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
    console.log('点击marker'+JSON.stringify(e));
    for (let index = 0; index < this.data.markers.length; index++) {
      let element = this.data.markers[index];
      if (e.markerId == element.id) {
        // element.width = 45;
        // element.height = 45;
        this.data.selectedMarker = this.data.allData[index];
      }else{
        // element.width = 30;
        // element.height = 30;
      }
    }
    this.setData({
      // markers:this.data.markers,
      showBottom:true,
      selectedMarker: this.data.selectedMarker,
    })
  },


  /**
   * 点击地图
   */
  tapMap(){
    this.setData({
      showBottom:false,
    })
  }
})
