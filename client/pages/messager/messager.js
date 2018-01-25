const util = require('../../utils/util.js');

module.exports = {
    data: {
        addMsgHide: false,
        messageList: [
            {
                content: '这是一个留言',
                skew: [5, 2, -2]
            },
            {
                content: '这是一个留言2',
                skew: [7, -4, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 2, 2]
            },
            {
                content: '这是一个留言4',
                skew: [-9, -1, -7]
            },
            {
                content: '这是一个留言5',
                skew: [10, 3, 5]
            },
            {
                content: '这是一个留言2',
                skew: [7, -4, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 2, 2]
            },
            {
                content: '这是一个留言2',
                skew: [7, -4, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 2, 2]
            },
            {
                content: '这是一个留言2',
                skew: [7, -14, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 2, 2]
            },
            {
                content: '这是一个留言2',
                skew: [7, -4, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 12, 2]
            },
            {
                content: '这是一个留言2',
                skew: [7, -4, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 2, 2]
            },
            {
                content: '这是一个留言2',
                skew: [7, -4, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 2, 2]
            },
            {
                content: '这是一个留言2',
                skew: [7, -4, 10]
            },
            {
                content: '这是一个留言3',
                skew: [4, 2, 2]
            }
        ]
    },
    handler: {
        getRedom : function (minNum, maxNum) {
            switch (arguments.length) {
                case 1: return parseInt(Math.random() * minNum + 1);
                case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
                default: return 0;
            }
        },
        showMsgInput: function () {
            this.setData({
                addMsgHide: !this.data.addMsgHide
            });
        }
    }
}