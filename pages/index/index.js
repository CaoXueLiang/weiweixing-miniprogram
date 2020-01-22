/*
 * @Author: your title
 * @Date: 2020-01-15 14:20:52
 * @LastEditTime : 2020-01-21 17:41:51
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
    chargePoleDetail:{"data":{"stationId":"a01b7b3b-2d62-428e-a635-b6b587689b44","stationName":"北京酒仙桥语言文化中心充电站","fastTerminalNum":5,"slowTerminalNum":5,"fastTerminalIdleNum":3,"slowTerminalIdleNum":4,"outNetworkTerminalNum":0,"usingTerminalNum":3,"isPersonalTerminal":false,"isTeldPersonalTerminal":false,"defaultImg":"https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg","imageSize":5,"advertisementImg":"","advertisementHtml":"","positionimgs":["https://resource.teld.cn/teldimage/115/badfc6d75c43442780a721bec19b2e9e.jpg"],"hasLock":"N","collected":"N","stationAddress":"北京市市辖区朝阳区北京市朝阳区将台西路2号","positionDesc":"酒仙桥语言文化中心（毗邻北京日本人学校西北侧）项目B2层089-094车位","lng":116.475639,"lat":39.975114,"distance":"2.9km","businessHours":"周一至周日00:00-24:00","operatorPhone":"4001-300-001","operatorName":"北汽特来电（北京）新能源科技有限公司","parkFee":"免费","priceDesc":"2.00元/度","specialDesc":"","payType":"本APP，特来电微信、支付宝小程序","specialDescV3":"","isInterconnection":false,"score":"3.9","priceScore":"--","serviceScore":"--","environmentScore":"--","fastParkIdleNum":"0","slowParkIdleNum":"0","fastParkNum":"0","slowParkNum":"0","canOrderFastNum":"0","canOrderSlowNum":"0","supportOrderFastNum":"0","supportOrderSlowNum":"0","openAir":"0","floor":"B2","highLimit":"","notBusinessHour":false,"originalPrice":"","limitChargeDesc":"","isRecommend":true,"timeoutFeeDesc":"","rangeTime":"00:00-24:00","rangePrice":"2.0000元/度","originalRangePrice":"","rangeSize":1,"nextRangeTime":"","nextRangePrice":"","electricPrice":"1.2000元/度","servicePrice":"0.8000元/度","lastChargeTime":"25分钟前","sceneManageName":"北汽特来电","sceneManageMobile":"","newStationType":"01","originalElectricPrice":"","originalServicePrice":"","mapImage":"","tagsNew":[{"tagLabel":"自营","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"对外开放","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"非露天B2","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"免费停车","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"芝麻信用·免充值","tagColor":"1CCFC9","tagDesc":""}],"lockDevicePhone":"","cameraIdentify":false,"carNoDiscountRule":"","pileOwner":[],"qaSupport":false,"commentSupport":true,"invoiceSupport":"特来电新能源有限公司","entrances":[{"lng":"116.475639","lat":"39.975114","name":"停车场入口"}],"tempCarTypeTags":[],"stationService":[{"name":"室内","img":"http://resource.teld.cn/teldimage/0/9a7e552a43b3408280954ff9e5ed7919.png","url":""}],"plusPrice":"","exclusivePrice":"","operateCompanyID":"52e810c1-42fd-46a8-9ea2-59b79524ba9b","settleCompanyID":"52e810c1-42fd-46a8-9ea2-59b79524ba9b","stationServiceDesc":"楼内有洗手间","businessDistrict":"朝阳区","aComment":"","parkFeeDesc":"停车免费","operateState":"3","monitorURL":"","parkfeeDiscount":false,"navPoints":[{"nav":[{"type":"2","name":"毗邻北京日本人学校西北侧","lng":"116.475639","lat":"39.975114"}]}],"autoLowerLock":false,"barrierLimit":false,"parkfeeDiscountType":"","priceInfo":[]},"errcode":null,"errmsg":null,"state":"1"},
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
    fiterDistanceIsSelected:!this.data.fiterDistanceIsSelected,
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
    fiterChargeTypeIsSelected:!this.data.fiterChargeTypeIsSelected,
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
    fiterPerferenceIsSelected:!this.data.fiterPerferenceIsSelected,
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
  let selectedItem = '';
  for (let index = 0; index < this.data.distanceArray.length; index++) {
    let element = this.data.distanceArray[index];
    if (index == currentIndex) {
      element.isSelected = true;
      selectedItem = element.name;
    } else {
      element.isSelected = false;
    }
  }
  this.setData({
    fiterDistance:selectedItem,
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
  *偏好设置选择标签
  *
  * @param {*} e
  */
 tapFilterItem(e){
   console.log(JSON.stringify(e));
   let currentElement = e.currentTarget.dataset.currentelement;
  for (let index = 0; index < this.data.perfenenceArray.length; index++) {
    let element = this.data.perfenenceArray[index];
    for (let index = 0; index < element.listArray.length; index++) {
      let tmpElement = element.listArray[index];
      if (tmpElement.name == currentElement.name) {
        tmpElement.isSelected = !tmpElement.isSelected
      }
    }
  }
  this.setData({
    perfenenceArray:this.data.perfenenceArray,
  })
 },

 /**
  *清空选择
  *
  */
 clearFiterMenthod(){
   for (let index = 0; index < this.data.perfenenceArray.length; index++) {
     let element = this.data.perfenenceArray[index];
     for (let index = 0; index < element.listArray.length; index++) {
       let tmpElement = element.listArray[index];
       tmpElement.isSelected = false;
     }
   }
   this.setData({
     perfenenceArray:this.data.perfenenceArray,
   })
   this.hideWindow();
 },

 /**
  *确认选择
  *
  */
 confirmMenthod(){
  this.hideWindow();
 },

 /**
  *使用微信内置地图查看位置
  *
  * @param {*} e
  */
 daohangMenthod(e){
  const latitude = Number(e.currentTarget.dataset.item.location.lat);
  const longitude = Number(e.currentTarget.dataset.item.location.lng);
  let name = e.currentTarget.dataset.item.title;
  let address = e.currentTarget.dataset.item.address;
  wx.openLocation({
    latitude,
    longitude,
    name,
    address,
    scale: 18
  })
 },

 /**
  *充电桩详情
  *
  */
 goToDetailMenthod(){
    wx.navigateTo({
      url: '../chargePileDetail/chargePileDetail',
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
  },
  
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '仿写特来电',
      path: '/pages/index/index'
    }
  },
})
