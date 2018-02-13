const util = require('../../utils/util.js');
const config = require('../../config');
const Pager = require('../../utils/pager.js');

module.exports = {
  data: {
    likeList: []
  },
  handler: {
    messagePager: new Pager({ pageSize: 5 }),
    likeShow: function () {
      debugger
      if (this.data.likeList.length === 0) {
        this.renderLikeList((data) => {
          this.messagePager.init({ recordCount: data.recordCount });
        })
      }
    },
    renderLikeList: function (callback) {
      if (this.messagePager.go('next')) {
        this.getLikeList().then((data) => {
          typeof callback === "function" && callback(data);
          this.data.likeList.push(data);
          this.setData({
            likeList: data
          });
        });
      }
    },
    getLikeList: function () {
      const self = this;
      wx.showLoading('加载中...');
      return new Promise((resolve, reject) => {
        wx.request({
          url: config.likeApi.list,
          data: {
            pageSize: self.messagePager.pageSize,
            thisPage: self.messagePager.thisPage,
            open_id: self.data.userInfo.openId
          },
          success: function (res) {
            if (res.data.code === '00001') {
              resolve({
                list: res.data.data.list,
                recordCount: res.data.data.recordCount
              });
            } else {
              reject();
            }
          },
          fail: function () {
            wx.showToast({ title: "请求错误~" })
          },
          complete: function () {
            wx.hideLoading();
          }
        })
      });
    },
    addLike: function ({ goodsId, open_id, success }) {
      util.singleRequest({
        url: config.likeApi.insert,
        postData: {
          goodsId: goodsId,
          open_id: open_id
        },
        alert: true,
        success: function (data) {
          success && success(data);
        }
      });
    },
    removeLike: function ({ goodsId, open_id, success }) {
      util.singleRequest({
        url: config.likeApi.remove,
        postData: {
          goodsId: goodsId,
          open_id: open_id
        },
        alert: true,
        success: function (data) {
          success && success(data);
        }
      });
    }
  }
}