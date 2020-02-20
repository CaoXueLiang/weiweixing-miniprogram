
// pages/search/search.js
let CommonManager = require("../../utils/managerHelper.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:'',
    isShowResult:false,
    searchAdressArray:[
      {name:'三里屯',adress:'北京朝阳区',distance:"7.5km"},
      {name:'三里屯',adress:'北京朝阳区',distance:"7.5km"},
      {name:'三里屯',adress:'北京朝阳区',distance:"7.5km"},
    ],
    chargeList:[
      {image:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',name:"北京通盈中心一期充电站",distance:"7.4km",score:"3",pretime:'16',Price:"1.6053",parkPrice:'5',tagArray:[{name:"自营"},{name:"对外开放"},{name:"非露天B2"},]},
      {image:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',name:"北京通盈中心一期充电站",distance:"7.4km",score:"3",pretime:'16',Price:"1.6053",parkPrice:'5',tagArray:[{name:"自营"},{name:"对外开放"},{name:"非露天B2"},]},
      {image:'https://resource.teld.cn/teldimage/115/9ce32d9e4b8c468bae8166a9cd3e6595_w200h200.jpg',name:"北京通盈中心一期充电站",distance:"7.4km",score:"3",pretime:'16',Price:"1.6053",parkPrice:'5',tagArray:[{name:"自营"},{name:"对外开放"},{name:"非露天B2"},]}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.stringify(CommonManager.getHistaryList));
  },

  bindInputMenthod: function (e) {
    console.log(e.detail.value)
    this.setData({
      isShowResult:e.detail.value.length > 0,
      keyWord:e.detail.value
    })
  },

  clickedConfirm(){
    console.log('点击完成')
    CommonManager.saveHistoryKey(this.data.keyWord);
  },

  backmenthod(){
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }

})