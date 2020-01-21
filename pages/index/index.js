/*
 * @Author: your title
 * @Date: 2020-01-15 14:20:52
 * @LastEditTime : 2020-01-21 11:03:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/index/index.js
 */

let CommonManager = require("../../utils/managerHelper.js");
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
    fiterDistance:'10km',
    fiterChargeType:'充电站',
    fiterPerference:'偏好',
    fiterDistanceIsSelected:false,
    fiterChargeTypeIsSelected:false,
    fiterPerferenceIsSelected:false,
    chargeTypeOneSelected:true,
    chargeTypeTwoSelected:false,
    distanceArray:[
      {name:'1km',isSelected:false},
      {name:'2km',isSelected:false},
      {name:'3km',isSelected:false},
      {name:'4km',isSelected:false},
      {name:'10km',isSelected:true},
      {name:'20km',isSelected:false},
      {name:'30km',isSelected:false},
      {name:'50km',isSelected:false},
      {name:'100km',isSelected:false},
      {name:'200km',isSelected:false},], 
    filterArray:[
      {name:'精品站',isSelected:true},
      {name:'对外开放',isSelected:true},
      {name:'免费停车',isSelected:false},
      {name:'自营',isSelected:false},
      {name:'快充',isSelected:false},
      {name:'终端空闲',isSelected:false},
      {name:'车位空闲',isSelected:false},],
    perfenenceArray:[
      {name:'推荐电站',listArray:[{name:'精品站',isSelected:false}]},
      {name:'电站类型',listArray:[{name:'对外开放',isSelected:false},{name:'不对外开放',isSelected:false},]},
      {name:'充电方式',listArray:[{name:'直流快充',isSelected:false},{name:'交流快充',isSelected:false},{name:'直流慢充',isSelected:false},]},
      {name:'电站状态',listArray:[{name:'空闲',isSelected:false}]},
      {name:'运营类型',listArray:[{name:'自营',isSelected:false},{name:'非自营',isSelected:false},{name:'互联互通',isSelected:false},]},
      {name:'智能地锁',listArray:[{name:'有地锁',isSelected:false},{name:'车位空闲(仅支持能感应车辆的车位)',isSelected:false}]},
      {name:'停车场',listArray:[{name:'露天',isSelected:false},{name:'非露天',isSelected:false},{name:'地上',isSelected:false},{name:'地下',isSelected:false},]},
      {name:'营业时间',listArray:[{name:'24小时',isSelected:false},{name:'营业中',isSelected:false},{name:'时间不确定',isSelected:false}]},
      {name:'充电接口',listArray:[{name:'国际2011',isSelected:false},{name:'国际2015',isSelected:false}]},
    ]
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
     this.searchMenthod(res.result.location.lat,res.result.location.lng);
     this.moveToLocation();
   })
 },

 /**
  * 点击头像
  */
 clickedAvatar(){

 },

 /**
  * 点击搜索
  */
 clickedSearch(){
   wx.navigateTo({
     url: '../search/search',
   })
 },

/**
 * 点击更多
 */
 clickedmore(){

 },

 /**
  * 距离筛选
  */
 distabceFilterMenthod(){
   this.setData({
    fiterDistanceIsSelected:true,
    fiterChargeTypeIsSelected:false,
    fiterPerferenceIsSelected:false,
   })
 },

/**
 * 充电桩类型筛选
 */
 typeFilterMenthod(){
  this.setData({
    fiterDistanceIsSelected:false,
    fiterChargeTypeIsSelected:true,
    fiterPerferenceIsSelected:false,
   })
 },

 /**
  * 偏好筛选
  */
 perfenceFilterMenthod(){
  this.setData({
    fiterDistanceIsSelected:false,
    fiterChargeTypeIsSelected:false,
    fiterPerferenceIsSelected:true,
   })
 },

 /**
  *点击筛选标签
  *
  * @param {*} e
  */
 clickedTagMenthod(e){
    console.log(JSON.stringify(e.currentTarget.dataset.clickedindex));
    let currentIndex = e.currentTarget.dataset.clickedindex;
    this.data.filterArray[currentIndex].isSelected = !this.data.filterArray[currentIndex].isSelected;
    this.setData({
      filterArray:this.data.filterArray,
    })
 },

 /**
  *点击距离筛选标签
  *
  * @param {*} e
  */
 clickedDistanceItem(e){
  let currentIndex = e.currentTarget.dataset.currentindex;
  for (let index = 0; index < this.data.distanceArray.length; index++) {
    let element = this.data.distanceArray[index];
    if (index == currentIndex) {
      element.isSelected = true;
    } else {
      element.isSelected = false;
    }
  }
  this.setData({
    distanceArray:this.data.distanceArray,
  })
 },

 /**
  * 隐藏筛选框
  *
  */
 hideWindow(){
   this.setData({
    fiterDistanceIsSelected:false,
    fiterChargeTypeIsSelected:false,
    fiterPerferenceIsSelected:false,
   })
 },


 /**
  *充电桩类型选择
  *
  */
 chargeTypeSelectedOne(){
   this.setData({
     chargeTypeOneSelected:true,
     chargeTypeTwoSelected:false,
     fiterChargeType:'充电站',
   })
 },

 /**
  *充电桩类型选择
  *
  */
 chargeTypeSelectedTwo(){
  this.setData({
    chargeTypeOneSelected:false,
    chargeTypeTwoSelected:true,
    fiterChargeType:'个人桩',
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
        that.searchMenthod(res.latitude,res.longitude);
      },
    })
  },

  /**
   * 周边搜索
   * @param {*} res 
   */
  searchMenthod:function(latitude,longitude){
    var that = this;
    CommonManager.QQMAPSearch('商场',latitude,longitude).then(res => {
      console.log(JSON.stringify(res));
      var tmpMarker = [];
      var tmpData = [];
      for (let index = 0; index < res.data.length; index++) {
        let element = res.data[index];
        element['tagArray'] = element.category.split(":");
        let oneMarker = {"id":element.id,"latitude":element.location.lat,"longitude":element.location.lng,"iconPath":"../../image/cluster_public_slow.png","width":30,"height":48,"callout":{"content":element.title,"color":'#FF650D','fontSize':13,"borderRadius":10,"padding":10},};
        tmpMarker.push(oneMarker);
        tmpData.push(element);
      }
      that.setData({
        markers:tmpMarker,
        allData:tmpData,
      });
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
        element.width = 45;
        element.height = 72;
        this.data.selectedMarker = this.data.allData[index];
      }else{
        element.width = 30;
        element.height = 48;
      }
    }
    this.setData({
      markers:this.data.markers,
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