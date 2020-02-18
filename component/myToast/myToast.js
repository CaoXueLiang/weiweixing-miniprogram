
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     message:String,
     isShowToast:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
     /**显示组件 */
     showToast(message){
       this.setData({
         isShowToast:true,
         message:message,
       })
       setTimeout(() => {
        this.setData({
          isShowToast:false,
        })
       }, 1000);
     },
  }
})
