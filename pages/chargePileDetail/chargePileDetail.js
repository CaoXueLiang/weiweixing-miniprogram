/*
 * @Author: your name
 * @Date: 2020-01-21 17:39:15
 * @LastEditTime : 2020-01-22 16:25:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/pages/chargePileDetail/chargePileDetail.js
 */
// pages/chargePileDetail/chargePileDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     chargeDetail:{"data":{"stationId":"a01b7b3b-2d62-428e-a635-b6b587689b44","stationName":"北京酒仙桥语言文化中心充电站","fastTerminalNum":5,"slowTerminalNum":5,"fastTerminalIdleNum":3,"slowTerminalIdleNum":4,"outNetworkTerminalNum":0,"usingTerminalNum":3,"isPersonalTerminal":false,"isTeldPersonalTerminal":false,"defaultImg":"https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg","imageSize":5,"advertisementImg":"","advertisementHtml":"","positionimgs":["https://resource.teld.cn/teldimage/115/badfc6d75c43442780a721bec19b2e9e.jpg"],"hasLock":"N","collected":"N","stationAddress":"北京市市辖区朝阳区北京市朝阳区将台西路2号","positionDesc":"酒仙桥语言文化中心（毗邻北京日本人学校西北侧）项目B2层089-094车位","lng":116.475639,"lat":39.975114,"distance":"2.9km","businessHours":"周一至周日00:00-24:00","operatorPhone":"4001-300-001","operatorName":"北汽特来电（北京）新能源科技有限公司","parkFee":"免费","priceDesc":"2.00元/度","specialDesc":"","payType":"本APP，特来电微信、支付宝小程序","specialDescV3":"","isInterconnection":false,"score":"3.9","priceScore":"--","serviceScore":"--","environmentScore":"--","fastParkIdleNum":"0","slowParkIdleNum":"0","fastParkNum":"0","slowParkNum":"0","canOrderFastNum":"0","canOrderSlowNum":"0","supportOrderFastNum":"0","supportOrderSlowNum":"0","openAir":"0","floor":"B2","highLimit":"","notBusinessHour":false,"originalPrice":"","limitChargeDesc":"","isRecommend":true,"timeoutFeeDesc":"","rangeTime":"00:00-24:00","rangePrice":"2.0000元/度","originalRangePrice":"","rangeSize":1,"nextRangeTime":"","nextRangePrice":"","electricPrice":"1.2000元/度","servicePrice":"0.8000元/度","lastChargeTime":"25分钟前","sceneManageName":"北汽特来电","sceneManageMobile":"","newStationType":"01","originalElectricPrice":"","originalServicePrice":"","mapImage":"","tagsNew":[{"tagLabel":"自营","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"对外开放","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"非露天B2","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"免费停车","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"芝麻信用·免充值","tagColor":"1CCFC9","tagDesc":""}],"lockDevicePhone":"","cameraIdentify":false,"carNoDiscountRule":"","pileOwner":[],"qaSupport":false,"commentSupport":true,"invoiceSupport":"特来电新能源有限公司","entrances":[{"lng":"116.475639","lat":"39.975114","name":"停车场入口"}],"tempCarTypeTags":[],"stationService":[{"name":"室内","img":"http://resource.teld.cn/teldimage/0/9a7e552a43b3408280954ff9e5ed7919.png","url":""}],"plusPrice":"","exclusivePrice":"","operateCompanyID":"52e810c1-42fd-46a8-9ea2-59b79524ba9b","settleCompanyID":"52e810c1-42fd-46a8-9ea2-59b79524ba9b","stationServiceDesc":"楼内有洗手间","businessDistrict":"朝阳区","aComment":"","parkFeeDesc":"停车免费","operateState":"3","monitorURL":"","parkfeeDiscount":false,"navPoints":[{"nav":[{"type":"2","name":"毗邻北京日本人学校西北侧","lng":"116.475639","lat":"39.975114"}]}],"autoLowerLock":false,"barrierLimit":false,"parkfeeDiscountType":"","priceInfo":[]},"errcode":null,"errmsg":null,"state":"1"},
     segmentArray:[
       {name:'电站',isSelected:true},
       {name:'终端',isSelected:false},
       {name:'评论',isSelected:false},
       {name:'问答',isSelected:false},
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 切换选择
   */
  switchMenthod(e){
    // console.log(JSON.stringify(e.currentTarget.dataset.item))
    for (let index = 0; index < this.data.segmentArray.length; index++) {
      let element = this.data.segmentArray[index];
      if (index == e.currentTarget.dataset.item) {
        element.isSelected = true;
      }else{
        element.isSelected = false;
      }
    }

    this.setData({
      segmentArray:this.data.segmentArray,
    })
  },

  /**
   * 预览图片
   */
  preImageMenthod(){
    wx.previewImage({
      current: this.data.chargeDetail.data.defaultImg, // 当前显示图片的http链接
      urls: [this.data.chargeDetail.data.defaultImg] // 需要预览的图片http链接列表
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})