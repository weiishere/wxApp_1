const { DB } = require('./db');
const httpCode = require('../utils/httpCode');

async function insert(ctx, next) {
    const { name, icon, parentId } = ctx.request.body;
    await DB('menu')
        .returning('id')
        .insert({
            name: name,
            icon: icon,
            parentId: parentId
        }).then(function (info) {
            ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
        }, function (e) {
            ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
        })
}

async function list(ctx, next) {
    const { id } = ctx.query;
    const result = id ? DB('menu').where('id', id) : DB('menu').select();
    await result.then(function (info) {
        ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
    }, function (e) {
        ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
    })
}

async function remove(ctx, next) {
    const { id } = ctx.request.body;
    if(!id){
        ctx.state = { code: httpCode.paramNullCode, data: 'id参数为空', stateCode: httpCode.paramNullCode };
        return next();
    }
    await DB('menu').where('id', id).del().then(function (info) {
        ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
    }, function (e) {
        ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
    })
}

async function update(ctx, next) {
    const { id, name, icon, parentId } = ctx.request.body;
    if(!id){
        ctx.state = { code: httpCode.paramNullCode, data: 'id参数为空', stateCode: httpCode.paramNullCode };
        return next();
    }
    await DB('menu').where('id', '=', id)
        .update({
            name: name,
            icon: icon,
            parentId: parentId,
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