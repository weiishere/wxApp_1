Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
  }
  return -1;
}
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
      this.splice(index, 1);
  }
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content || '暂无异常描述'),
    showCancel: false
  })
}

//**通用方法：获取链表数据 */
var getObject = function (list, key, value, handler) {
  let result;
  list.forEach((item, i) => {
    if (item[key] === value) {
      result = item;
    }
    handler && handler(item, i);
  });
  return result;
}
var getItemDataByServer = function ({ url, keyData }) {
  wx.showLoading('加载中...');
  return Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: keyData,
      success: function (res) {
        if (res.data.code == '00001') {
          resolve(res.data);
        } else {
          util.showModel('操作失败(' + res.data.code + ')');
          reject();
        }
      },
      fail: function () {
        showModel('请求错误');
        reject();
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  });

}
var singleRequest = function ({ url, postData, success, error, fail, complete }) {
  wx.request({
    url: url,
    data: postData,
    method: 'POST',
    success: function (res) {
      if (res.data.code == '00001') {
        showSuccess('操作成功');
        success && success(res.data);
      } else {
        showModel('操作失败(' + res.data.code + ')');
        error && error(res.data);
      }
    },
    fail: function () {
      showModel('请求错误');
      fail && fail();
    },
    complete: function () {
      wx.hideLoading();
      complete && complete();
    }
  });
}
module.exports = { formatTime, showBusy, showSuccess, showModel, getObject, getItemDataByServer, singleRequest }
