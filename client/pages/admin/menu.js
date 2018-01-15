const util = require('../../utils/util.js');
module.exports = {
  //**删除菜单 */
  btuDeleteMenu: function (event) {
    const self = this;
    const _id = event.currentTarget.dataset.id; let index;
    const chooseMenu = util.getObject(this.data.menuList, 'id', _id, function (item, i) {
      if (item.id == _id) { index = i; }
    });
    wx.showModal({
      title: '提示',
      content: '你确定要删除菜单-(' + chooseMenu.name + ")吗？",
      success: function (res) {
        if (res.confirm) {
          self.data.menuList.splice(index, 1);
          self.setData({
            menuList: self.data.menuList
          });
        }
      }
    });
  },
  goEditMenu: function (event) {
    //console.log('goEditBanner');
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../edit/edit?mode=menu&action=edit&key=' + id
    })
  },
  goAddMenu:function(){
    wx.navigateTo({
      url: '../edit/edit?mode=banner&action=add'
    });
  }
}