const { DB } = require('./db');
const httpCode = require('../utils/httpCode');

async function insert(ctx, next) {
    const { open_id, content, belongId } = ctx.request.body;
    await DB('message')
        .returning('id')
        .insert({
            open_id: open_id,
            content: content,
            belongId: belongId
        }).then(function (info) {
            ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
        }, function (e) {
            ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
        })
}

async function list(ctx, next) {
    const { open_id, belongId } = ctx.query;
    const result = DB('message').where(ctx.query);
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
    await DB('message').where('id', id).del().then(function (info) {
        ctx.state = { code: httpCode.successCode, data: info, stateCode: httpCode.successCode };
    }, function (e) {
        ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
    })
}

async function updateAgree(ctx, next) {
    const { id } = ctx.request.body;
    if (!id) {
        ctx.state = { code: httpCode.paramNullCode, data: 'id参数为空', stateCode: httpCode.paramNullCode };
        return next();
    }
    await DB.raw('UPDATE message SET agree = agree + 1 WHERE id = ' + id).then(function (info) {
        ctx.state = { code: httpCode.successCode, data: 'success', stateCode: httpCode.successCode };
    }, function (e) {
        ctx.state = { code: e.sqlState, data: e.sqlMessage, stateCode: httpCode.sqlErrorCode };
    })
}
module.exports = {
    insert,
    remove,
    updateAgree,
    list
}