
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowEntryItem:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function() {
      this.setData({
        isShowEntryItem:false,
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 点击快捷导航按钮
     */
    clickedItem(){
       this.setData({
         isShowEntryItem:!this.data.isShowEntryItem,
       })
    },

    /**
     * 点击编辑按钮
     */
    editeMenthod(){
      console.log('编辑')
    },

    clickedItem1(){
      console.log('clickedItem1')
    },

    clickedItem2(){
      console.log('clickedItem2')
    },

    clickedItem3(){
      console.log('clickedItem3')
    },

    clickedItem4(){
      console.log('clickedItem4')
    },
  }

})
