
// pages/search/search.js
let CommonManager = require("../../utils/managerHelper.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:'',
    isShowResult:false,
    keyList:[],
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
    console.log(wx.getStorageSync('histaryKeyArray'));
    let currentArray = wx.getStorageSync('histaryKeyArray') ? wx.getStorageSync('histaryKeyArray') : [];
    this.setData({
      keyList:currentArray
    })
  },

  /**
   * 输入框内容发生改变时调用
   *
   * @param {*} e
   */
  bindInputMenthod(e) {
    // let keyWord = e.detail.value;
    // console.log('正在输入' +  keyWord)
  },

  /**
   * 保存搜索历史关键字
   * @param {*} keyWord 
   */
  _saveKeyWord(keyWord){
    let currentArray = wx.getStorageSync('histaryKeyArray') ? wx.getStorageSync('histaryKeyArray') : [];
    if (currentArray.indexOf(keyWord) < 0 && keyWord.length > 0) {
      currentArray.push(keyWord);
      wx.setStorage({
        key:'histaryKeyArray',
        data:currentArray
      })
    }
  },

  /**
   * 点击键盘完成按钮
   */
  clickedConfirm(){
    console.log('点击完成' + this.data.keyWord)
    this._saveKeyWord(this.data.keyWord);
  },

  clearCache(){
     wx.removeStorageSync('histaryKeyArray');
     this.setData({
      keyList:[],
     })
  },

  backmenthod(){
    wx.navigateBack({
      delta: 1, 
    })
  },
})