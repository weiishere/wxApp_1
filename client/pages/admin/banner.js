const util = require('../../utils/util.js');
var config = require('../../config');
module.exports = {

  /**暂没提供async函数支持 */
  // getAsyncList: async function () {
  //   await wx.request({
  //     url: config.bannerApi.list,
  //     data: {},
  //     success: function (res) {
  //       resolve(res);
  //     },
  //     fail: function () {
  //       wx.showToast({ title: "请求错误~" })
  //     }
  //   })
  // },
  getBannerList: function () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.bannerApi.list,
        data: {},
        success: function (res) {
          resolve(res.data);
        },
        fail: function () {
          wx.showToast({ title: "请求错误~" })
        }
      });
    });
  },
  //**删除banner */
  btuDeleteBanner: function (event) {
    const self = this;
    const _id = event.currentTarget.dataset.id; let index;
    const chooseBanner = util.getObject(this.data.imgUrls, 'id', _id, function (item, i) {
      if (item.id == _id) { index = i; }
    });
    wx.showModal({
      title: '提示',
      content: '你确定要删除banner-(' + chooseBanner.title + ")吗？",
      success: function (res) {
        if (res.confirm) {
          //delete cooseBanner;
          wx.showLoading('加载中...');
          wx.request({
            url: config.bannerApi.remove,
            data: { id: _id },
            method: 'POST',
            success: function (res) {
              if (res.data.code == '00001') {
                util.showSuccess('删除操作成功');
                self.data.imgUrls.splice(index, 1);
                self.setData({
                  imgUrls: self.data.imgUrls
                });
              } else {
                util.showModel('操作失败(' + res.data.code + ')')
              }
            },
            fail: function () {
              util.showModel('请求错误');
            },
            complete: function () {
              wx.hideLoading();
            }
          });
        }
      }
    });
  },
  addBanner: function (fromsList) {
    const postData = {};
    fromsList.forEach(item => {
      postData[item.key] = item.value;
    });
    postData['imageUrl'] = 'https://www.swarovski.com.cn/Web_CN/zh/binary/gentics-content?contentid=10008.519937';//调试，默认给一张图片
    wx.showLoading('加载中...');
    wx.request({
      url: config.bannerApi.insert,
      data: postData,
      method: 'POST',
      success: function (res) {
        if (res.data.code == '00001') {
          util.showSuccess('新增操作成功');
        } else {
          util.showModel('操作失败(' + res.data.code + ')')
        }
      },
      fail: function () {
        util.showModel('请求错误');
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  goEditBanner: function (event) {
    //console.log('goEditBanner');
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../edit/edit?mode=banner&action=edit&key=' + id
    })
  },
  goAddBanner: function () {
    wx.navigateTo({
      url: '../edit/edit?mode=banner&action=add'
    });
  }
}