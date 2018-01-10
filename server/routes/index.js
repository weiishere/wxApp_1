
const banner = require('./banner');
/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
router.use('/', banner.routes(), banner.allowedMethods());
module.exports = router;
