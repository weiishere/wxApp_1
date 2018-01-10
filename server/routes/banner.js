const banner = require('./banner');

const router = require('koa-router')({
    prefix: 'banner/'
})
router.get('list', (ctx, next) => {
    ctx.body = 'banner list';
});
router.get('add', (ctx, next) => {
    ctx.body = 'banner list';
});

module.exports = router;



