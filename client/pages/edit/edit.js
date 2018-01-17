const util = require('../../utils/util.js');
var config = require('../../config');
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
    ],
    activeItem: {},
    buttonName: '提交'
  },
  ...goodsManager,
  ...bannerManager,
  ...menuManager,
  initBannerView: function (param) {
    // const towxml = new Towxml();
    // let data = towxml.toJson('<s>sdddddddfff</s>', 'markdown');
    //设置文档显示主题，默认'light'
    //data.theme = 'dark';
    let initData = (item) => {
      return [
        {
          template: 'imageUpload',
          key: 'imageUrl',
          activeClass: 'imageUploadWrapper',
          title: 'banner主图',
          value: item && item.imageUrl
        },
        {
          template: 'input',
          key: 'title',
          title: 'banner主题标题',
          value: item && item.title
        },
        {
          template: 'freeText',
          key: 'article',
          title: '主内容',
          value: item && item.article
        }
      ]
    }
    param.action === 'edit' && wx.showLoading('加载中...');
    return new Promise((resolve, reject) => {
      if (param.action === 'edit') {
        this.getBannerList({ id: param.key }).then((data) => {
          wx.hideLoading();
          resolve(initData(data.data[0]));
        }, () => { wx.hideLoading(); reject(); });
      } else {
        resolve(initData());
      }
    });
  },
  initMenuView: function (param) {
    let initData = (item) => {
      return [
        {
          template: 'input',
          key: 'name',
          title: '菜单名称',
          value: item && item.name
        },
        {
          template: 'input',
          key: 'icon',
          title: '图标名称',
          value: item && item.icon
        }
      ]
    }
    param.action === 'edit' && wx.showLoading('加载中...');
    return new Promise((resolve, reject) => {
      if (param.action === 'edit') {
        this.getMenuList({ id: param.key }).then((data) => {
          wx.hideLoading();
          resolve(initData(data.data[0]));
        }, () => { wx.hideLoading(); reject(); });
      } else {
        resolve(initData());
      }
    });
  },
  initGoodsView: function (param) {
    let initData = (item) => {
      return [
        {
          template: 'imageUpload',
          key: 'bannerImage',
          activeClass: 'imageUploadWrapper',
          title: '产品主图'
        },
        {
          template: 'input',
          key: 'name',
          title: '主标题'
        },
        {
          template: 'input',
          key: 'remark',
          title: '备注副标题'
        },
        {
          template: 'input',
          key: 'price',
          title: '价格'
        },
        {
          template: 'select',
          key: 'unit',
          title: '单位',
          selectList: [
            { id: 1, name: '个' },
            { id: 2, name: '瓶' },
            { id: 3, name: '罐' },
            { id: 4, name: '箱' },
            { id: 5, name: '件' },
            { id: 6, name: '套' },
            { id: 7, name: '对' },
            { id: 8, name: '副' }
          ],
          chooseIndex: 0
        },
        {
          template: 'select',
          key: 'categroyId',
          title: '类别',
          selectList: [
            {
              id: 2,
              name: '最新上架',
              icon: 'new',
            }
          ],
          chooseIndex: 0
        },
        {
          template: 'imageUpload',
          key: 'bannerImage',
          activeClass: 'imageUploadWrapper',
          title: '图片介绍(可不传)'
        },
        {
          template: 'freeText',
          key: 'content',
          title: '主内容',
          value: ""
        }
      ]
    }
    param.action === 'edit' && wx.showLoading('加载中...');
    return new Promise((resolve, reject) => {
      if (param.action === 'edit') {
        this.getGoodsList({ id: param.key }).then((data) => {
          wx.hideLoading();
          resolve(initData(data.data[0]));
        }, () => { wx.hideLoading(); reject(); });
      } else {
        resolve(initData());
      }
    });
  },
  unitPickerChange: function (e) {
    //const goodstype = util.getObject(this.data.goodsType, 'id', e.detail.value);
    util.getObject(this.data.fromsList, "key", "unit", function (item, i) {
      if (item.key === 'unit') {
        item.chooseIndex = e.detail.value;
      }
    })
    this.setData({
      fromsList: this.data.fromsList
    })
  },
  setActiveItem: function (key) {
    if (e.detail.key !== this.data.activeItem.key) {
      util.getObject(this.data.fromsList, "key", e.detail.key, (item, i) => {
        if (item.key === e.currentTarget.dataset.key) {
          this.data.activeItem.item = item;
        }
      });
    }
  },
  textInput: function (e) {
    if (!this.data.activeItem || e.currentTarget.dataset.key !== this.data.activeItem.key) {
      this.data.activeItem = util.getObject(this.data.fromsList, "key", e.currentTarget.dataset.key);
    }
    this.data.activeItem.value = e.detail.value;
  },
  doUpload: function (e) {
    // 选择图片
    const self = this;
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
            util.showSuccess('上传图片成功');
            res = JSON.parse(res.data);
            self.data.activeItem = util.getObject(self.data.fromsList, "key", e.currentTarget.dataset.key);//这里必须再获取一次，待探究（是否是赋值给了self呢）
            self.data.activeItem.value = res.data.imgUrl;
            self.setData({
              fromsList: self.data.fromsList
            });
          },
          fail: function (e) {
            util.showModel('上传图片失败');
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  submit: function () {
    if (this.data.action === 'add') {
      switch (this.data.mode) {
        case 'banner':
          this.addBanner(this.data.fromsList);
          break;
        case 'menu':
          this.addMenu(this.data.fromsList);
          break;
        case 'goods':
          this.addGoods(this.data.fromsList);
          break;
      }
    } else if (this.data.action === 'edit') {
      switch (this.data.mode) {
        case 'banner':
          this.updateBanner(this.data.fromsList);
          break;
        case 'menu':
          this.updateMenu(this.data.fromsList);
          break;
        case 'goods':
          this.updateGoods(this.data.fromsList);
          break;
      }
    }
  },
  previewImg: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.imgurl,
      urls: [e.currentTarget.dataset.imgurl]
    })
  },
  onLoad: function ({ mode, action, key }) {
    const _init = (_flist) => {
      if (key) this.data.fromsList[0].value = key;
      this.setData({
        mode: mode,
        action: action,
        key: key,
        fromsList: action === "edit" ? this.data.fromsList.concat(_flist) : this.data.fromsList = _flist,
        buttonName: action === "edit" ? "提交更新" : "确认新增"
      });
    }
    wx.setNavigationBarTitle({
      title: mode + '-' + (action === 'edit' ? '编辑' : '新增')
    });

    switch (mode) {
      case 'banner':
        this.initBannerView({ action, key }).then((data) => { _init(data); });
        break;
      case 'menu':
        this.initMenuView({ action, key }).then((data) => { _init(data); });
        break;
      case 'goods':
        this.initGoodsView({ action, key }).then((data) => { _init(data); });
        break;
    }

  }
});