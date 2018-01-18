const util = require('../../utils/util.js');
var config = require('../../config');
module.exports = {

  bindgoodsTypePickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', this.data.menuList[+e.detail.value].id)
    this.getGoodsList({ category: +this.data.menuList[+e.detail.value].id }).then((res) => {
      this.setData(
        {
          goods: {
            pager: {
              thisPage: 1,
              pagesize: 20,
              recodeCount: 133
            },
            list: res.list,
            chooseType: e.detail.value
          }
        });
    });
  },
  getGoodsList: function (param) {
    let chooseIndex=0;
    if (param && param.categoryId){
      let _item = util.getObject(this.data.menuList, 'id', param.categoryId);
      chooseIndex = this.data.menuList(_item);
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.goodsApi.list,
        data: param,
        success: function (res) {
          resolve({
            pager: {
              thisPage: 1,
              pagesize: 20,
              recodeCount: 133
            },
            list: res.data.data,
            chooseType: chooseIndex
          });
        },
        fail: function () {
          wx.showToast({ title: "请求错误~" })
        }
      })
    });
  },
  // getGoods: function (id) {
  //   return new Promise((resolve, reject) => {
  //     wx.request({
  //       url: config.bannerApi.list,
  //       data: { id: id },
  //       success: function (res) {
  //         resolve(res.data[0]);
  //       },
  //       fail: function () {
  //         wx.showToast({ title: "请求错误~" })
  //       }
  //     });
  //   });

  // },
  addGoods: function (fromsList) {
    const postData = {};
    fromsList.forEach(item => {
      postData[item.key] = item.value;
    });
    postData.introImage = postData.introImage && postData.introImage.join(',');
    util.singleRequest({
      url: config.goodsApi.insert,
      postData: postData
    });
  },
  updateGoods: function (fromsList) {
    const postData = {};
    fromsList.forEach(item => {
      postData[item.key] = item.value;
    });
    postData.introImage = postData.introImage.join(',');
    util.singleRequest({
      url: config.goodsApi.update,
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
          util.singleRequest({
            url: config.goodsApi.remove,
            postData: { id: _id },
            success: () => {
              this.data.goods.list.splice(index, 1);
              this.setData({
                goods: this.data.goods
              });
            }
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