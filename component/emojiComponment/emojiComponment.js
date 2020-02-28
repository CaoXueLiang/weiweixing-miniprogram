/*
 * @Author: your name
 * @Date: 2020-02-24 15:14:47
 * @LastEditTime: 2020-02-28 16:15:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/component/emojiComponment/emojiComponment.js
 */

// component/emojiComponment/emojiComponment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojisArray: [],//qq、微信原始表情
    dealEmotionsArray:[],
    isEmotion:true, //是否是表情
    keyWord:'',
    pictureUrl:'../../image/jianpan.png',
  },

  /**
   * 生命周期方法
   */
  lifetimes: {
    attached: function() {
      let emChar = this.data.emojiChar.split("-");
      this.data.emoji.forEach((element,index) => {
        //  console.log(element + index)
         let em = {
          char: emChar[index],
          emoji: "0x1f" + element
        };
        this.data.emojisArray.push(em);
      });
      this.setData({
        emojisArray:this.data.emojisArray
      })
      this.dealEmotionMenthod();
      // console.log(JSON.stringify(this.data.emojisArray))
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 点击表情
     * @param {*} e
     */
    clickedEmotionMenthod(e){
      let info = e.currentTarget.dataset.emotioninfo;
      let currentKey = this.data.keyWord + info.char;
      this.setData({
         keyWord:currentKey,
      })
      // console.log(JSON.stringify(e.currentTarget.dataset.emotioninfo) + JSON.stringify(this.data.keyWord))
    },

    /**
     * 处理emotion
     */
    dealEmotionMenthod(){
       let num  = parseInt(this.data.emojisArray.length / 21);
       console.log(num,this.data.emojisArray.length)

       /**遍历是倍数的元素 */
       for (let index = 0; index < num; index++) {
         let itemArray = [];
         for (let currentIndex = index*21; currentIndex < 21+index*21; currentIndex++) {
           const element = this.data.emojisArray[currentIndex];
           itemArray.push(element);
         }
         this.data.dealEmotionsArray.push(itemArray);
       }

       /**遍历剩余的元素 */
       let remainedArray = [];
       for (let index = 21*num; index < this.data.emojisArray.length; index++) {
         const element = this.data.emojisArray[index];
         remainedArray.push(element);
       }
       this.data.dealEmotionsArray.push(remainedArray);

      //  console.log('处理后的表情'+JSON.stringify(this.data.dealEmotionsArray))
       this.setData({
        dealEmotionsArray:this.data.dealEmotionsArray,
       })
    },

  /**
   * 输入框内容发生改变时调用
   *
   * @param {*} e
   */
  bindInputMenthod(e) {
    let keyWord = e.detail.value;
    // console.log('正在输入===' +  keyWord)
    this.setData({
      keyWord:keyWord,
    })
  },

  /**
   * 
   */
  switchInpputMenthod(){
    this.data.isEmotion = !this.data.isEmotion;
    this.setData({
      isEmotion:this.data.isEmotion,
      pictureUrl:this.data.isEmotion ? '../../image/jianpan.png' : '../../image/smiling.png',
    })
  },

  /**
   * 点击键盘完成按钮
   */
  clickedConfirm(){
    console.log('点击完成====' + this.data.keyWord);
    // var myEventDetail = {data:this.data.keyWord} // detail对象，提供给事件监听函数
    // var myEventOption = {} // 触发事件的选项
    // this.triggerEvent('keyboardConfirm', myEventDetail, myEventOption)
  },

  /**
   * 发送按钮
   */
  sendMenthod(){
     if (this.data.keyWord.length < 0) {
       return
     }
     console.log('发送====' + this.data.keyWord);

     var myEventDetail = {data:this.data.keyWord} // detail对象，提供给事件监听函数
     var myEventOption = {} // 触发事件的选项
     this.triggerEvent('sendMessage', myEventDetail, myEventOption)

     /** 发送关键字后，清空关键字 */
     this.setData({
       keyWord:'',
     })
  },

  }
})
