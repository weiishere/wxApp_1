
const banner = require('./banner');
const menu = require('./menu');
const goods = require('./goods');
const controller = require('../controller');
/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
router.use('/', banner.routes(), banner.allowedMethods());
router.use('/', menu.routes(), menu.allowedMethods());
router.use('/', goods.routes(), goods.allowedMethods());
router.post('/upload', controller.upload);
module.exports = router;
