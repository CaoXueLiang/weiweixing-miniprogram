/*
 * @Author: your name
 * @Date: 2020-01-15 14:36:07
 * @LastEditTime: 2020-02-21 11:32:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weiweixing-miniprogram/utils/managerHelper.js
 */

let QQMapWX = require('./qqmap-wx-jssdk')
let qqmapsdk = new QQMapWX({
  key: 'FEABZ-DL7CW-RAPRE-RBZXF-ATOO7-R6BRP'
});
let URLConfig = require('./URLConfig.js');

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

/**
 * 网络请求
 * @param {*} params
 * @returns 请求结果
 */
 fetchMenthod(params) {
  return new Promise(function(resolve, reject) {
    let header = {
      'content-type': params.content_type || 'application/json',
      'token': wx.getStorageSync('token')
    }
    wx.request({
      header: header,
      url: URLConfig.Host + params.url,
      data: params.data || {},
      method: params.method || 'POST',
      success: function(res) {
        resolve(res);
      },
      fail: function(info) {
        reject(info);
      }
    })
  });
},


/**
 * 格式化日期函数
 * @param date {Date|Date String} [需要格式化的日期]
 * @param frm {String} [格式(如：yyyy-MM-dd hh:mm:ss)]
 * @return 格式化后的日期
 */
 formatDate(date, fmt) {
  fmt = fmt ? fmt : 'yyyy-MM-dd'

  if (!date || !fmt) {
    return ''
  }

  var theDate = ''
  if (typeof date == 'number') {
    theDate = new Date(date)
  } else if (date.length === undefined) {
    theDate = date
  } else {
    if (date.length > 10) {
      var dateArr = date.split(/[T\s]/)

      var beforeTime = dateArr[0].split('-')
      var afterTime = dateArr[1].split(':')

      afterTime[2] = afterTime[2] ? afterTime[2] : '00'
    } else {
      var beforeTime = date.split('-')
    }

    if (afterTime) {
      theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2], afterTime[0], afterTime[1], afterTime[2])
    } else {
      theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2])
    }
  }

  if (!theDate) {
    return
  }

  var o = {
    'M+': theDate.getMonth() + 1, // 月份
    'd+': theDate.getDate(), // 日
    'h+': theDate.getHours(), // 小时
    'm+': theDate.getMinutes(), // 分
    's+': theDate.getSeconds(), // 秒
    'q+': Math.floor((theDate.getMonth() + 3) / 3), // 季度
    'S': theDate.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (theDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
},


 /**
   * 获取小程序码,只有预览模式可以用，线上必须从后台获取
   * @param {*} userId 
   * @param {*} tuanId 
   * @param {*} callback 
   */
  getMiniAppQRCode(userId,tuanId,callback) {
    /** 首先获取access_token */
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf496e83293c11855&secret=7918d26c54490cdd11dd40d398423fd3', 
      data: {},
      menthod:'POST',
      header: {
        'content-type': 'application/json',
      },
      success (res) {
        let token = res.data.access_token;
        /** 获取小程序码图片 */
        wx.request({
            url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+token,
            data: {
              scene: '1111&2222&333',
              page: "pages/index/index"  
              },
            method: "POST",
            responseType: 'arraybuffer', 
            success(res) {
              // console.log('====小程序码图片==='+ JSON.stringify(res))
              var src2 = wx.arrayBufferToBase64(res.data);
              let imageData = 'data:image/png;base64,'+src2;
              // console.log('====小程序码图片==='+ JSON.stringify(imageData))
              callback(imageData);
            },
          })
       }
    })
  },

   /**
    * 调用微信支付
    * @param {*} result 下单参数
    */
   weChatPay:function(result){
    console.log('支付参数' + JSON.stringify(result) + result.timeStamp);
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: result.timeStamp,
        nonceStr: result.nonceStr,
        package: "prepay_id=" + result.prepayId,
        signType: 'MD5',
        paySign: result.paySign,
        success:(res) =>{
          //支付成功
          resolve(res);
        },
        fail: (res) =>{
          //支付失败
          reject(res);
        }
      })
    });
  },

}