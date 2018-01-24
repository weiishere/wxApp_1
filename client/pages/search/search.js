const util = require('../../utils/util.js');
var config = require('../../config');

module.exports = {
    searchOrder: function (event) {
        const order = event.currentTarget.dataset.order;
        if (order === 'back') {
            this.setData({
                isIn: false
            });
            setTimeout(() => {
                this.setData({
                    searchVislble: false,
                    tagList: []
                });
            }, 400);
        }
    }
}