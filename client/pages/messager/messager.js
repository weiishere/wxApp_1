const util = require('../../utils/util.js');

module.exports = {
    data: {
        addMsgHide: false
    },
    handler: {
        showMsgInput: function () {
            this.setData({
                addMsgHide:!this.data.addMsgHide
            });
        }
    }
}