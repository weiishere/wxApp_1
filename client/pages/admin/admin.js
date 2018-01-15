const util = require('../../utils/util.js');
const goodsManager = require('./goods.js');
const bannerManager = require('./banner.js');
const menuManager = require('./menu.js');
Page({
  data: {
    tabList: [
      {
        name: 'Banner',
        code: 'banner',
        desc: '轮播图片信息管理',
        icon: 'icon-banner_set',
        isActive: true
      },
      {
        name: 'Menu',
        code: 'menu',
        desc: '商品类别管理',
        icon: 'icon-menu'
      },
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
    ],
    menuList: [
      {
        id: 1,
        menuId: 1,
        name: '店主推荐',
        icon: 'home',
        // iconColor:'F01B2D'
        isActive: true
      },
      {
        id: 2,
        menuId: 2,
        name: '最新上架',
        icon: 'new',

      },
      {
        id: 3,
        menuId: 3,
        name: '护肤美妆',
        icon: 'brand-makeup'
      },
      {
        id: 4,
        menuId: 4,
        name: '首饰精品',
        icon: 'jewelry'
      },
      {
        id: 5,
        menuId: 5,
        name: '母婴喂养',
        icon: 'baby1'
      },
      {
        id: 6,
        menuId: 6,
        name: '其他精品',
        icon: 'Recommend'
      }
    ],
    imgUrls: [
      {
        id: 1,
        url: 'https://gss3.bdstatic.com/70cFsjip0QIZ8tyhnq/img/iknow/aazdpinpai.png',
        title: '好妈妈，从这里坐起，你需要知道的育儿知识'
      },
      {
        id: 2,
        url: 'https://www.swarovski.com.cn/Web_CN/zh/binary/gentics-content?contentid=10008.519937',
        title: 'THE ICONIC COLLECTION，別具特色的系列'
      },
      {
        id: 3,
        url: 'https://www.dior.cn/beauty/zh_cn/store/campaign/newyear2018/pc/new-year_03.jpg',
        title: '2018新年快乐，迪奥为您呈现'
      }
    ],
    goods: {
      pager: {
        thisPage: 1,
        pagesize: 20,
        recodeCount: 133
      },
      list: [
        {
          id: '114',
          name: '4爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
          categroy: 4,
          image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
          price: '￥180',
          unit: '桶',
          remark: '德国原装进口，接受整箱订购：8*175',
          desc: ''
        },
        {
          id: '115',
          name: '爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
          categroy: 1,
          image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
          price: '￥230',
          unit: '桶',
          remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
          desc: ''
        },
        {
          id: '116',
          name: '4爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
          categroy: 4,
          image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
          price: '￥180',
          unit: '桶',
          remark: '德国原装进口，接受整箱订购：8*175',
          desc: ''
        },
        {
          id: '117',
          name: '爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
          categroy: 1,
          image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
          price: '￥230',
          unit: '桶',
          remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
          desc: ''
        }, {
          id: '118',
          name: '4爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
          categroy: 4,
          image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
          price: '￥180',
          unit: '桶',
          remark: '德国原装进口，接受整箱订购：8*175',
          desc: ''
        },
        {
          id: '119',
          name: '爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
          categroy: 1,
          image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
          price: '￥230',
          unit: '桶',
          remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
          desc: ''
        },
        {
          id: '120',
          name: '4爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
          categroy: 4,
          image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
          price: '￥180',
          unit: '桶',
          remark: '德国原装进口，接受整箱订购：8*175',
          desc: ''
        },
        {
          id: '121',
          name: '爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
          categroy: 1,
          image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
          price: '￥230',
          unit: '桶',
          remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
          desc: ''
        }, {
          id: '122',
          name: '4爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
          categroy: 4,
          image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
          price: '￥180',
          unit: '桶',
          remark: '德国原装进口，接受整箱订购：8*175',
          desc: ''
        },
        {
          id: '123',
          name: '爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
          categroy: 1,
          image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
          price: '￥230',
          unit: '桶',
          remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
          desc: ''
        },
        {
          id: '124',
          name: '4爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
          categroy: 4,
          image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
          price: '￥180',
          unit: '桶',
          remark: '德国原装进口，接受整箱订购：8*175',
          desc: ''
        },
        {
          id: '125',
          name: '爱他美aptamil白金版婴幼儿奶粉 3段(12个月以上)900g',
          categroy: 1,
          image: 'https://img11.360buyimg.com//n0/jfs/t2821/33/3160571466/452335/5faac900/5786fa96N40a8d09d.jpg',
          price: '￥230',
          unit: '桶',
          remark: '40年骄“澳”升级之作，科学配比，助益宝宝健康~爱他美，贴合天生营养所需，接受整箱订购：￥205×8',
          desc: ''
        }
      ],
      chooseType: 0
    },
    config: {
      storeName: '秀容的精品小店',
      themeColor: '#ccf',
      welcome: '欢迎来到精品小店，本店新上***，欢迎了解并微信我哦~'
    }
  },

  //**切换tab */
  changeTab: function (event) {
    const code = event.currentTarget.dataset.code;
    const chooseTab = util.getObject(this.data.tabList, 'code', code, function (item) {
      if (item.code !== code) {
        item.isActive = false;
      } else {
        item.isActive = true;
      }
    });
    this.setData({
      tabList: this.data.tabList,
      showType: chooseTab
    })
  },
  ...menuManager,
  ...bannerManager,
  ...goodsManager,
  onLoad: function () {
    //console.log(this);
    const self = this;
    wx.showLoading('加载中...');
    this.getList().then((res)=>{
      this.setData({
        showType: self.data.tabList[0],
        imgUrls: res.data.data
      });
      wx.hideLoading();
    })
    
    // wx.createSelectorQuery().select('.container-admin').boundingClientRect((rect) => {
    //   self.setData({
    //     showType: self.data.tabList[0]
    //   });
    // }).exec();

  }
})
