/*
 * @Author: your name
 * @Date: 2020-01-21 17:39:15
 * @LastEditTime: 2020-02-28 16:18:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/pages/chargePileDetail/chargePileDetail.js
 */
// pages/chargePileDetail/chargePileDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colored:"#f8f8f8",
     chargeDetail:{"data":{"stationId":"a01b7b3b-2d62-428e-a635-b6b587689b44","stationName":"北京酒仙桥语言文化中心充电站","fastTerminalNum":5,"slowTerminalNum":5,"fastTerminalIdleNum":3,"slowTerminalIdleNum":4,"outNetworkTerminalNum":0,"usingTerminalNum":3,"isPersonalTerminal":false,"isTeldPersonalTerminal":false,"defaultImg":"https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg","imageSize":5,"advertisementImg":"","advertisementHtml":"","positionimgs":["https://resource.teld.cn/teldimage/115/badfc6d75c43442780a721bec19b2e9e.jpg"],"hasLock":"N","collected":"N","stationAddress":"北京市市辖区朝阳区北京市朝阳区将台西路2号","positionDesc":"酒仙桥语言文化中心（毗邻北京日本人学校西北侧）项目B2层089-094车位","lng":116.475639,"lat":39.975114,"distance":"2.9km","businessHours":"周一至周日00:00-24:00","operatorPhone":"4001-300-001","operatorName":"北汽特来电（北京）新能源科技有限公司","parkFee":"免费","priceDesc":"2.00元/度","specialDesc":"","payType":"本APP，特来电微信、支付宝小程序","specialDescV3":"","isInterconnection":false,"score":"3.9","priceScore":"--","serviceScore":"--","environmentScore":"--","fastParkIdleNum":"0","slowParkIdleNum":"0","fastParkNum":"0","slowParkNum":"0","canOrderFastNum":"0","canOrderSlowNum":"0","supportOrderFastNum":"0","supportOrderSlowNum":"0","openAir":"0","floor":"B2","highLimit":"","notBusinessHour":false,"originalPrice":"","limitChargeDesc":"","isRecommend":true,"timeoutFeeDesc":"","rangeTime":"00:00-24:00","rangePrice":"2.0000元/度","originalRangePrice":"","rangeSize":1,"nextRangeTime":"","nextRangePrice":"","electricPrice":"1.2000元/度","servicePrice":"0.8000元/度","lastChargeTime":"25分钟前","sceneManageName":"北汽特来电","sceneManageMobile":"","newStationType":"01","originalElectricPrice":"","originalServicePrice":"","mapImage":"","tagsNew":[{"tagLabel":"自营","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"对外开放","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"非露天B2","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"免费停车","tagColor":"8c8c8c","tagDesc":""},{"tagLabel":"芝麻信用·免充值","tagColor":"1CCFC9","tagDesc":""}],"lockDevicePhone":"","cameraIdentify":false,"carNoDiscountRule":"","pileOwner":[],"qaSupport":false,"commentSupport":true,"invoiceSupport":"特来电新能源有限公司","entrances":[{"lng":"116.475639","lat":"39.975114","name":"停车场入口"}],"tempCarTypeTags":[],"stationService":[{"name":"室内","img":"http://resource.teld.cn/teldimage/0/9a7e552a43b3408280954ff9e5ed7919.png","url":""}],"plusPrice":"","exclusivePrice":"","operateCompanyID":"52e810c1-42fd-46a8-9ea2-59b79524ba9b","settleCompanyID":"52e810c1-42fd-46a8-9ea2-59b79524ba9b","stationServiceDesc":"楼内有洗手间","businessDistrict":"朝阳区","aComment":"","parkFeeDesc":"停车免费","operateState":"3","monitorURL":"","parkfeeDiscount":false,"navPoints":[{"nav":[{"type":"2","name":"毗邻北京日本人学校西北侧","lng":"116.475639","lat":"39.975114"}]}],"autoLowerLock":false,"barrierLimit":false,"parkfeeDiscountType":"","priceInfo":[]},"errcode":null,"errmsg":null,"state":"1"},
     isShowDInzhan:true,    //是否显示电站
     isShowZhongDuan:false, //是否显示终端
     isShowPingLun:false,   //是否显示评论
     isShowWenDa:false,     //是否显示问答
     canvasImageArray:[],   //Canvas图片数组，解决层级问题
     isShowKeyboard:false,  //键盘是否显示
     segmentArray:[
       {name:'电站',isSelected:true},
       {name:'终端',isSelected:false},
       {name:'评论',isSelected:false},
       {name:'问答',isSelected:false},
     ],
     terminalList:[
       {name1:'201号直流(1101050477201)',name2:'车位号无',name3:'50kw-150kw',name4:'250v-750v',name5:'直流快充',name6:'国标2015',progress:'0',status:'空闲'},
       {name1:'201号直流(1101050477201)',name2:'车位号无',name3:'50kw-150kw',name4:'250v-750v',name5:'直流快充',name6:'国标2015',progress:'78%',status:'充电中',percent:0.78},
       {name1:'201号直流(1101050477201)',name2:'车位号无',name3:'50kw-150kw',name4:'250v-750v',name5:'直流快充',name6:'国标2015',progress:'0',status:'空闲'},
       {name1:'201号直流(1101050477201)',name2:'车位号无',name3:'50kw-150kw',name4:'250v-750v',name5:'直流快充',name6:'国标2015',progress:'23%',status:'充电中',percent:0.23},
       {name1:'201号直流(1101050477201)',name2:'车位号无',name3:'50kw-150kw',name4:'250v-750v',name5:'直流快充',name6:'国标2015',progress:'0',status:'空闲'},
     ],
     commentArray:[
      {
       avator:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',
       name:'明明明',
       reply:'嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻',
       score:'1',
       time:"01-17 21:48",
       likeNum:1,
       replyNum:2,
       likeArray:[{name:'小明'},{name:'小花'},{name:'小亮'},{name:'小明'},{name:'小花'},{name:'小亮'},{name:'小明'},{name:'小花'},{name:'小亮'},{name:'小明'},{name:'小花'},{name:'小亮'},],
       replyArray:[{name:'北汽特来电',reply:'您好，使用特来电APP进行启动，免两小时停车费超出时间的停车费以实际场地为准，感谢您的理解'}]
      },
      {
        avator:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',
        name:'啊啊啊',
        reply:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        score:'2',
        time:"01-17 21:48",
        likeNum:1,
        replyNum:2,
        likeArray:[{name:'小和'},],
        replyArray:[
          {name:'北汽特来电',reply:'您好，使用特来电APP进行启动，免两小时停车费超出时间的停车费以实际场地为准，感谢您的理解'},
          {name:'小小艾',reply:'回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复'},
          {name:'小花',reply:'哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或'}
        ]
       },
       {
        avator:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',
        name:'嘿嘿嘿嘿嘿嘿',
        reply:'少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所',
        score:'3',
        time:"01-17 21:48",
        likeNum:1,
        replyNum:2,
        likeArray:[{name:'小明'},{name:'小花'}]
       },
       {
        avator:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',
        name:'呃呃呃呃呃呃呃呃呃',
        reply:'哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多多多多多',
        score:'4',
        time:"01-17 21:48",
        likeNum:1,
        replyNum:2,
        likeArray:[],
        replyArray:[{name:'北汽特来电',reply:'您好，使用特来电APP进行启动，免两小时停车费超出时间的停车费以实际场地为准，感谢您的理解'}]
       },
       {
        avator:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',
        name:'突突突突突突拖拖拖拖拖拖拖拖拖拖拖',
        reply:'呀呀呀呀呀呀晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕晕',
        score:'4',
        time:"01-17 21:48",
        likeNum:1,
        replyNum:2,
        likeArray:[],
        replyArray:[]
       },
     ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     for (let index = 0; index < this.data.terminalList.length; index++) {
       let element = this.data.terminalList[index];
       if (element.status === '空闲') {
         this.drawProgressbg('canvasProgressbg_normal'+index,'#00d17f',0);
       }else if(element.status === '充电中'){
        this.drawProgressbg('canvasProgressbg_normal'+index,'#e7e7e7',0);
        this.drawProgressbg('canvasProgressbg_progress'+index,'#00b9df',element.percent);
       }
     }
  },

  /**
   * 将Canvas转化为图片
   * @param {*} tmpid
   */
  _canvasToTempFilePathMenthod(tmpid){
    wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: tmpid,
      success(res) {
        console.log('图片信息' +  res)
      },
      fail(res){
        console.log(res)
      }
    })
  },

  /**
   * 绘制圆环
   * @param {*} canvasId
   * @param {*} color
   * @param {*} progress
   */
  drawProgressbg(canvasId,color,progress){
    //使用 wx.createContext 获取绘图上下文 context
    let ctx = wx.createCanvasContext(canvasId);
    //设置圆环的宽度
    ctx.setLineWidth(5);
    //设置圆环端点的形状
    ctx.setLineCap('round');
    //设置圆环的颜色
    ctx.setStrokeStyle(color);
    //绘制弧度
    ctx.arc(35,35,30,1.5*Math.PI,progress*Math.PI*2 - 0.5*Math.PI);
    ctx.stroke();
    ctx.draw();
  },
  
  /**
   * 2d绘制页面
   */
  _drawCanvas2DMenthod(){
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        /* 2.9.0 及以上版本都要设置一下 canvas 的宽高。默认是 300x150 的。
           css 控制不了？必须通过canvas.width 这样去设置吗？ */
        canvas.width = 70
        canvas.height = 70
        const ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(244, 94, 77, 1)';
        ctx.lineWidth = 5;
        ctx.arc(35, 35, 30, 0, 2*Math.PI, false);
        ctx.stroke();
      })
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
      isShowDInzhan:this.data.segmentArray[0].isSelected,
      isShowZhongDuan:this.data.segmentArray[1].isSelected,
      isShowPingLun:this.data.segmentArray[2].isSelected,
      isShowWenDa:this.data.segmentArray[3].isSelected,
      isShowKeyboard:this.data.segmentArray[3].isSelected ? true : false,
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

  },

  /**
   * 点击键盘确认
   */
  onKeyboardConfirm(e){
    console.log('点击键盘===='+ JSON.stringify(e.detail.data))
  },

  /**
   * 点击发送按钮
   */
  onSendMessage: function(e){
    // e.detail // 自定义组件触发事件时提供的detail对象
    console.log('点击发送按钮===='+ JSON.stringify(e.detail.data))
    wx.showToast({
      title: e.detail.data,
      icon: 'none',
    })
    
  }

})