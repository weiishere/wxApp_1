const util = require('../../utils/util.js');
const goodsManager = require('../admin/goods.js');
const bannerManager = require('../admin/banner.js');
const menuManager = require('../admin/menu.js');
//const Towxml = require('../../utils/towxml/main');


Page({
  data: {
    fromsList: [
      {
        template: 'text',
        key: 'id',
        value: '未设定',
        activeClass: 'imageUploadWrapper',
        title: '主键值',
        disabled: true
      }
    ]
  },
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              imgUrl: res.data.imgUrl
            })
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  initBannerView: function (param) {
    // const towxml = new Towxml();
    // let data = towxml.toJson('<s>sdddddddfff</s>', 'markdown');
    //设置文档显示主题，默认'light'
    //data.theme = 'dark';
    return [
      {
        template: 'imageUpload',
        key: 'bannerImage',
        activeClass: 'imageUploadWrapper',
        title: 'banner主图'
      },
      {
        template: 'input',
        key: 'title',
        title: 'banner主题标题'
      },
      {
        template: 'freeText',
        key: 'content',
        title: '主内容',
        value: ""
      }
    ]
  },
  initMenuView:function(){
    return [
      {
        template: 'input',
        key: 'name',
        title: '菜单名称'
      },
      {
        template: 'input',
        key: 'icon',
        title: '图标名称'
      }
    ]
  },
  onLoad: function ({ mode, action, key }) {
    let _fromsList;
    switch (mode) {
      case 'banner': _fromsList = this.initBannerView({ action, key }); break;
      case 'menu': _fromsList = this.initMenuView({ action, key }); break;
      case 'goods': _fromsList = this.initGoodsView({ action, key }); break;
    }
    this.setData({
      mode: mode,
      action: action,
      key: key,
      fromsList: this.data.fromsList.concat(_fromsList)
    });
  }
});