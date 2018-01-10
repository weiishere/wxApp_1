const util = require('../../utils/util.js')

Page({
  data: {
    tabList: [
      {
        name: 'Banner',
        code: 'banner',
        desc:'轮播图片信息管理',
        icon: 'icon-banner_set',
        isActive: true
      },
      {
        name: 'Menu',
        code: 'menu',
        desc: '商品类别管理',
        icon: 'icon-menu'
      }
      ,
      {
        name: 'Goods',
        code: 'goods',
        desc: '商品管理',
        icon: 'icon-goods'
      },
      {
        name: 'Config',
        code: 'config',
        desc: '基本配置',
        icon: 'icon-config'
      }
    ]
  },
  changeTab: function (event) {
    const code = event.currentTarget.dataset.code;
    let chooseTab;
    this.data.tabList.forEach((item) => {
      if (item.code !== code) {
        item.isActive = false;
      } else {
        item.isActive = true;
        chooseTab = item;
      }
    });
    this.setData({
      tabList: this.data.tabList,
      showType: chooseTab
    })
  },
  onLoad: function () {
    this.setData({
      showType: this.data.tabList[0]
    })
  }
})
