
let QQMapWX = require('./qqmap-wx-jssdk')

module.exports = {
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
    let qqmapsdk = new QQMapWX({
        key: 'FEABZ-DL7CW-RAPRE-RBZXF-ATOO7-R6BRP'
    });
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: "wgs84",
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

}