/*
 * @Author: your name
 * @Date: 2020-02-18 16:48:56
 * @LastEditTime: 2020-02-24 11:42:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/component/myToast/myToast.js
 */

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
