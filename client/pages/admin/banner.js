module.exports = {
  //**删除banner */
  btuDeleteBanner: function (event) {
    const self = this;
    const _id = event.currentTarget.dataset.id; let index;
    const chooseBanner = this.getObject(this.data.imgUrls, 'id', _id, function (item, i) {
      if (item.id == _id) { index = i; }
    });
    wx.showModal({
      title: '提示',
      content: '你确定要删除banner-(' + chooseBanner.title + ")吗？",
      success: function (res) {
        if (res.confirm) {
          //delete cooseBanner;
          self.data.imgUrls.splice(index, 1);
          self.setData({
            imgUrls: self.data.imgUrls
          });
        }
      }
    });
  },
}