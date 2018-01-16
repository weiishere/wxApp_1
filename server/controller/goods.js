const { DB } = require('./db');
const httpCode = require('../utils/httpCode');

async function insert(ctx, next) {
    const { categroy, mainImage, price, discount, unit, remark, storage, introImage, introduction, status } = ctx.request.body;
    await DB('goods')
        .returning('id')
        .insert({
            categroy: categroy,
            mainImage: mainImage,
            price: price,
            discount: discount,
            unit: unit,
            remark: remark,
            storage: storage,
            introImage: introImage,
            introduction: introduction,
            status: status
        }).then(function (info) {
            ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
        }, function (e) {
            ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
        })
}

async function list(ctx, next) {
    const { id } = ctx.query;
    //查询单个数据才给出详情，列表不给
    const result = id ? DB('goods').where('id', id) : DB('goods').select('id','categroy', 'mainImage', 'price', 'discount', 'unit', 'remark', 'storage', 'status');
    await result.then(function (info) {
        ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
    }, function (e) {
        ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
    })
}


async function remove(ctx, next) {
    const { id } = ctx.request.body;
    if (!id) {
        ctx.state = { code: httpCode.paramNullCode, data: 'id参数为空', stateCode: httpCode.paramNullCode };
        return next();
    }
    await DB('goods').where('id', id).del().then(function (info) {
        ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
    }, function (e) {
        ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
    })
}

async function update(ctx, next) {
    const { id, categroy, mainImage, price, discount, unit, remark, storage, introImage, introduction, status } = ctx.request.body;
    if (!id) {
        ctx.state = { code: httpCode.paramNullCode, data: 'id参数为空', stateCode: httpCode.paramNullCode };
        return next();
    }
    await DB('goods').where('id', '=', id)
        .update({
            categroy: categroy,
            mainImage: mainImage,
            price: price,
            discount: discount,
            unit: unit,
            remark: remark,
            storage: storage,
            introImage: introImage,
            introduction: introduction,
            status: status,
            thisKeyIsSkipped: undefined
        }).then(function (info) {
            ctx.state = { code: httpCode.successCode, data: 'success', stateCode: httpCode.successCode };
        }, function (e) {
            ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
        })
}
module.exports = {
    insert,
    remove,
    update,
    list
}