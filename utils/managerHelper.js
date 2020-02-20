/*
 * @Author: your name
 * @Date: 2020-01-15 14:36:07
 * @LastEditTime: 2020-02-20 17:32:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/utils/managerHelper.js
 */

let QQMapWX = require('./qqmap-wx-jssdk')
let qqmapsdk = new QQMapWX({
  key: 'FEABZ-DL7CW-RAPRE-RBZXF-ATOO7-R6BRP'
});

module.exports = {
  /**
   * 显示提示
   * @param {*} that
   * @param {*} message
   */
  ShowMessage(that,message){
    let toastCom = that.selectComponent("#e-toast");
    toastCom.showToast(message);
  },

  /**
   * 获取wxcode
   */
  loginWx: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code)
          } else {
            reject(res)
          }
        },
        fail: (res) => {
          reject({ type: "wxLogin", code: 0 });
        }
      })
    });
  },

  /**
   * 腾讯地图定位
   */
  QQMAPLocation:function(){
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: "gcj02",
            success: (res) => {
                resolve(res);
            },
            fail:(res) =>{
                reject(res);
            }
        })
    }).then((localtion) =>{
        return new Promise((resolve,reject) => {
            qqmapsdk.reverseGeocoder({
                location: {
                    latitude: localtion.latitude,//纬度
                    longitude: localtion.longitude//经度
                },
                success: function (addressRes) {
                    resolve(addressRes);
                },
                fail:(res) => {
                    reject(res);
                }
            }); 
        })
    });
},

 /**
   * 腾讯地图搜索
   */
  QQMAPSearch:function(key,lat,lon){
    return new Promise((resolve,reject) => {
      qqmapsdk.search({
          keyword: key,
          location: {
              latitude: lat,
              longitude: lon,
          },
          success: function (res) {
              resolve(res);
          },
          fail:(res) => {
              reject(res);
          }
      }); 
  })
},

}