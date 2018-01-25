const util = require('../../utils/util.js');
const config = require('../../config');
const Pager = require('../../utils/pager.js');

module.exports = {
  data: {
    addMsgHide: false,
    messageList: [
      // {
      //   content: '这是一个留言',
      //   skew: [5, 2, -2]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -4, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 2, 2]
      // },
      // {
      //   content: '这是一个留言4',
      //   skew: [-9, -1, -7]
      // },
      // {
      //   content: '这是一个留言5',
      //   skew: [10, 3, 5]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -4, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 2, 2]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -4, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 2, 2]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -14, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 2, 2]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -4, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 12, 2]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -4, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 2, 2]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -4, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 2, 2]
      // },
      // {
      //   content: '这是一个留言2',
      //   skew: [7, -4, 10]
      // },
      // {
      //   content: '这是一个留言3',
      //   skew: [4, 2, 2]
      // }
    ],
    newMessage: {
      content: '',
      isHideName: true
    }
  },
  handler: {
    messagePager: new Pager({ pageSize: 22 }),
    getRedom: function (minNum, maxNum) {
      switch (arguments.length) {
        case 1: return parseInt(Math.random() * minNum + 1);
        case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
        default: return 0;
      }
    },
    messageHandler: function (event) {
      const order = event.currentTarget.dataset.order;
      if (order === 'show') {
        this.setData({
          addMsgHide: !this.data.addMsgHide
        });
      } else if (order === 'hidename') {
        this.setData({
          newMessage: {
            content: this.data.newMessage.content,
            isHideName: !this.data.newMessage.isHideName
          }
        });
      } else if (order === 'send') {
        const self = this;
        util.singleRequest({
          url: config.messageApi.insert,
          postData: {
            open_id: 'test',
            content: self.data.newMessage.content,
            hideName: +self.data.newMessage.isHideName
          }
        });
      } else if (order === 'input') {
        this.setData({
          newMessage: {
            content: event.detail.value,
            isHideName: this.data.newMessage.isHideName
          }
        });
      }
    },
    messagerShow: function () {
      if (this.data.messageList.length === 0) {
        this.renderMesList((data) => {
          this.messagePager.init({ recordCount: data.recordCount });
        });

      }
    },
    renderMesList: function (callback) {
      if (this.messagePager.go('next')) {
        this.getMessageList().then((data) => {
          data.list.forEach(item => {
            this.data.messageList.push({
              content: item.content,
              skew: [this.getRedom(-10, 10), this.getRedom(-7, 7), this.getRedom(-8, 8)]
            });
          });
          typeof callback === "function" && callback(data);
          this.setData({
            messageList: this.data.messageList
          });
        });
      }
    },
    getMessageList: function () {
      const self = this;
      wx.showLoading('加载中...');
      return new Promise((resolve, reject) => {
        wx.request({
          url: config.messageApi.list,
          data: {
            pageSize: self.messagePager.pageSize,
            thisPage: self.messagePager.thisPage,
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
    }
  }
}