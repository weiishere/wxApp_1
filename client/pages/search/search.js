const util = require('../../utils/util.js');

module.exports = {
    data: {
        searchVislble: false,
        isIn: false
    },
    handler: {
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
}