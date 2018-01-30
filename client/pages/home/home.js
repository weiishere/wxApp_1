const util = require('../../utils/util.js');
const Pager = require('../../utils/pager.js');
const config = require('../../config');
const searchManager = require('../search/search.js');
const { getMenuList } = require('../admin/menu.js');
const messagerManager = require('../messager/messager.js');
const likeManager = require('../like/like.js');
const goodsManager = require('../admin/goods.js');
const aboutManager = require('../about/about.js');
const { getBannerList } = require('../admin/banner');
const defaultPgeSize = 10;

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
    goodsList: [],
    // [
    //   {
    //     id: '111',
    //     name: '爱他美Aptamil 儿童配方奶粉4段(36-72个月适用)800g',
    //     category: 1,
    //     image: 'https://img10.360buyimg.com/n1/jfs/t5632/225/2855201961/384545/197cc50/59350734Nd49bd2f6.jpg',
    //     price: '￥180',
    //     unit: '桶',
    //     remark: '德国原装进口，接受整箱订购：￥175×8',
    //     desc: ''
    //   }
    // ],
    imgUrls: [],
    logged: false,
    userInfo: {},
    sliderSet: {
      autoplay: true,
      circular: true
    },
    activeTab: 'home',
    ...searchManager.data,
    ...messagerManager.data,
    ...likeManager.data,
    ...aboutManager.data
  },
  ...searchManager.handler,
  ...messagerManager.handler,
  ...likeManager.handler,
  ...aboutManager.handler,
  ...goodsManager,
  
  chooseMenu: function (event) {
    let chooseMenuId, chooseMenu;
    let isLoadMore = event.currentTarget.dataset.id ? false : true;
    if (!isLoadMore) {
      chooseMenuId = event.currentTarget.dataset.id;
      chooseMenu = util.getObject(this.data.menuList, 'id', chooseMenuId, (item, i) => {
        item['isActive'] = (item.id === chooseMenuId);
      });
    } else {
      chooseMenuId = util.getObject(this.data.menuList, 'isActive', true).id;
      chooseMenu = util.getObject(this.data.menuList, 'id', chooseMenuId);
    }
    let _goodsList = util.getObject(this.data.goodsList, 'category', chooseMenuId);
    if (_goodsList && !isLoadMore) {
      //有event说明是重新选择了菜单
      this.setData({
        showGoodList: _goodsList.goods,
        showMenu: chooseMenu,
        menuList: this.data.menuList,
        isMore: _goodsList.isMore
      });
    } else {
      //第一次加载数据或者更多
      const _goodsBundle = util.getObject(this.data.goodsList, 'category', chooseMenuId);
      if (_goodsBundle && !_goodsBundle.isMore) {
        return;
      }
      this.getGoodsList({
        category: chooseMenuId,
        thisPage: !isLoadMore ? 1 : ++_goodsList.pager.thisPage,
        pageSize: defaultPgeSize
      }).then(data => {
        let result = this.joinGoodsList(chooseMenuId, data.list, data.recordCount);
        this.setData({
          showGoodList: result.goods,
          showMenu: chooseMenu,
          menuList: this.data.menuList,
          isMore: result.isMore
        });
      });
    }
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
  userLogin: function () {
    if (this.data.logged) return
    util.showBusy('正在登录')
    let that = this
    const qcloud = require('../../vendor/wafer2-client-sdk/index');
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },
      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  joinGoodsList: function (category, goodsList, recordCount) {
    let goodsBundle = util.getObject(this.data.goodsList, 'category', category);
    if (!goodsBundle) {
      let _obj = {
        category: category,
        goods: goodsList,
        pager: new Pager({ pageSize: defaultPgeSize }),
        isMore: goodsList.length === recordCount ? false : true
      }
      this.data.goodsList.push(_obj);
      return _obj;
    } else {
      let newArray = goodsBundle.goods.concat(...goodsList);
      goodsBundle.goods = newArray;
      goodsBundle.isMore = newArray.length === recordCount ? false : true;
      return goodsBundle;
    }
  },
  onLoad: function () {
    getMenuList().then(menuData => {
      let menuList = menuData.data;
      menuList[0]['isActive'] = true;
      this.setData({
        menuList: menuList
      });
      Promise.all([getBannerList(), this.getGoodsList({
        category: menuList[0].id,
        thisPage: 1,
        pageSize: defaultPgeSize
      })]).then(values => {
        let result = this.joinGoodsList(menuList[0].id, values[1].list, values[1].recordCount);
        result.pager.init({ recordCount: values[1].recordCount });
        this.setData({
          showGoodList: values[1].list,
          showMenu: menuList[0],
          imgUrls: values[0].data,
          isMore: result.isMore
        });
      });


      // const goodList = this.getActiveGoodsList(menuList[0]);
      // this.setData({
      //   showGoodList: goodList,
      //   showMenu: menuList[0]
      // });
    });


    this.userLogin();
  }
});