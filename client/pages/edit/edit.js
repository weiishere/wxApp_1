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
    ],
    activeItem: {
      key: '',
      item: {}
    }
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
  initMenuView: function () {
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
  initGoodsView: function () {

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
  textInput: function (e) {

    if (e.detail.key !== this.data.activeItem.key) {
      util.getObject(this.data.fromsList, "key", e.detail.key, (item, i) => {
        if (item.key === e.currentTarget.dataset.key) {
          this.data.activeItem.item = item;
        }
      });
    }
    this.data.activeItem.item.value = e.detail.value;
  },
  submit: function () {
    console.log(this.data.fromsList);
  },
  onLoad: function ({ mode, action, key }) {
    let _fromsList;
    wx.setNavigationBarTitle({
      title: mode + '-' + (action === 'edit' ? '编辑' : '新增')
    })
    switch (mode) {
      case 'banner': _fromsList = this.initBannerView({ action, key }); break;
      case 'menu': _fromsList = this.initMenuView({ action, key }); break;
      case 'goods': _fromsList = this.initGoodsView({ action, key }); break;
    }
    this.setData({
      mode: mode,
      action: action,
      key: key,
      fromsList: action === "edit" ? this.data.fromsList.concat(_fromsList) : this.data.fromsList = _fromsList
    });
  }
});