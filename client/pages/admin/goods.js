const util = require('../../utils/util.js');
module.exports = {

  bindgoodsTypePickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    const goodsData = this.getGoodsListByType(1, e.detail.value);
    this.setData({
      goods: goodsData
    })
  },
  getGoodsListByType: function (pageIndex, menuId) {
    return {
      chooseType: menuId || this.data.goods.chooseType,
      pager: {
        thisPage: pageIndex || 1,
        pagesize: 20,
        recodeCount: 133
      },
      list: []
    };
  },
  getGoods: function (id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.bannerApi.list,
        data: { id: id },
        success: function (res) {
          resolve(res.data[0]);
        },
        fail: function () {
          wx.showToast({ title: "请求错误~" })
        }
      });
    });

  },
  addGoods: function (fromsList) {
    const postData = {};
    fromsList.forEach(item => {
      postData[item.key] = item.value;
    });
    console.log(postData);
    return;
    util.singleRequest({
      url: config.goodsApi.insert,
      postData: postData
    });
  },
  btuDeleteGoods: function (event) {
    const self = this;
    const _id = event.currentTarget.dataset.id; let index;
    const chooseGoods = util.getObject(this.data.goods.list, 'id', _id, function (item, i) {
      if (item.id == _id) { index = i; }
    });
    wx.showModal({
      title: '提示',
      content: '你确定要删除-(' + chooseGoods.name + ")吗？",
      success: (res) => {
        if (res.confirm) {
          this.data.goods.list.splice(index, 1);
          this.setData({
            goods: this.data.goods
          });
        }
      }
    });
  },
  goEditGoods: function (event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../edit/edit?mode=goods&action=edit&key=' + id
    })
  },
  goAddGoods: function () {
    wx.navigateTo({
      url: '../edit/edit?mode=goods&action=add'
    });
  }
}