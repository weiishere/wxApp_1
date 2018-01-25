const util = require('../../utils/util.js');
const searchManager = require('../search/search.js');
const tagManager = require('../admin/tag.js');
const messagerManager = require('../messager/messager.js');

Page({
  data: {
    menuList: [
      {
        menuId: 1,
        name: '店主推荐',
        icon: 'home',
        // iconColor:'F01B2D'
        isActive: true
      },
      {
        menuId: 2,
        name: '最新上架',
        icon: 'new',

      },
      {
        menuId: 3,
        name: '护肤美妆',
        icon: 'brand-makeup'
      },
      {
        menuId: 4,
        name: '首饰精品',
        icon: 'jewelry'
      },
      {
        menuId: 5,
        name: '母婴喂养',
        icon: 'baby1'
      },
      {
        menuId: 6,
        name: '其他精品',
        icon: 'Recommend'
      }
    ],
    goodsList: [
      {
        id: '111',
        name: '爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
        category: 1,
        image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
        price: '￥180',
        unit: '桶',
        remark: '德国原装进口，接受整箱订购：￥175×8',
        desc: ''
      },
      {
        id: '112',
        name: '2爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
        category: 2,
        image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
        price: '￥180',
        unit: '桶',
        remark: '德国原装进口，接受整箱订购：8*175',
        desc: ''
      },
      {
        id: '113',
        name: '3爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
        category: 3,
        image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
        price: '￥180',
        unit: '桶',
        remark: '德国原装进口，接受整箱订购：8*175',
        desc: ''
      },
      {
        id: '114',
        name: '4爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
        category: 4,
        image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
        price: '￥180',
        unit: '桶',
        remark: '德国原装进口，接受整箱订购：8*175',
        desc: ''
      },
      {
        id: '115',
        name: '爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
        category: 1,
        image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
        price: '￥230',
        unit: '桶',
        remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
        desc: ''
      },
      {
        id: '115',
        name: '澳洲爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
        category: 5,
        image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
        price: '￥210',
        unit: '桶',
        remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
        desc: ''
      },
    ],
    imgUrls: [
      {
        url: 'https://gss3.bdstatic.com/70cFsjip0QIZ8tyhnq/img/iknow/aazdpinpai.png',
        title: '好妈妈，从这里坐起，你需要知道的育儿知识'
      },
      {
        url: 'https://www.swarovski.com.cn/Web_CN/zh/binary/gentics-content?contentid=10008.519937',
        title: 'THE ICONIC COLLECTION，別具特色的系列'
      },
      {
        url: 'https://www.dior.cn/beauty/zh_cn/store/campaign/newyear2018/pc/new-year_03.jpg',
        title: '2018新年快乐，迪奥为您呈现'
      }
    ],

    sliderSet: {
      autoplay: true,
      circular: true
    },
    activeTab: 'home',
    ...searchManager.data,
    ...messagerManager.data
  },
  ...searchManager.handler,
  ...messagerManager.handler,
  ...tagManager,
  getActiveMenu: function () {
    let _item;
    this.data.menuList.forEach((item) => {
      if (item.isActive) _item = item;
    })
    return _item;
  },
  getActiveGoodsList: function (menu) {
    let _goodList = [];
    this.data.goodsList.forEach((item) => {
      if (item.category === menu.menuId) _goodList.push(item);
    })
    return _goodList;
  },
  chooseMenu: function (event) {
    const chooseMenuId = event.currentTarget.dataset.id;
    let chooseMenu;
    this.data.menuList.forEach((item) => {
      if (item.menuId !== chooseMenuId) {
        item.isActive = false;
      } else {
        item.isActive = true;
        chooseMenu = item;
      }
    });
    this.setData({
      menuList: this.data.menuList,
      showGoodList: this.getActiveGoodsList(chooseMenu)
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../details/details'
    })
  },
  footerChange: function (event) {
    this.setData({
      activeTab: event.currentTarget.dataset.key,
      searchisIn: false
    });
    this[event.currentTarget.dataset.key + 'Show']();
    setTimeout(() => {
      this.setData({
        searchVislble: false,
        tagList: []
      });
    }, 400);
  },
  homeShow: function () { },
  onLoad: function () {
    const menu = this.getActiveMenu();
    const goodList = this.getActiveGoodsList(menu);
    console.log(goodList);
    this.setData({
      showGoodList: goodList,
      showMenu: menu
    })
  }
});