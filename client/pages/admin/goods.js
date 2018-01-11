module.exports = {
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    const goodsData = this.getGoodsListByType(e.detail.value);
    this.setData({
      goods: goodsData
    })
  },
  getGoodsListByType: function (pageIndex, menuId) {
    return {
      chooseType: menuId || this.data.goods.chooseType,
      pager: {
        thisPage: pageIndex,
        pagesize: 20,
        recodeCount: 133
      },
      list: []
    };
  },
  btuDeleteGoods: function (event) {
    const self = this;
    const _id = event.currentTarget.dataset.id; let index;
    const chooseGoods = this.getObject(this.data.goods.list, 'id', _id, function (item, i) {
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
  }
}