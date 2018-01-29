const util = require('../../utils/util.js');
const config = require('../../config');
const Pager = require('../../utils/pager.js');

module.exports = {
  data: {
    likeList: []
  },
  handler: {
    likeShow: function () {
      if (this.data.likeList.length === 0) {
        // this.renderMesList((data) => {
        //   this.messagePager.init({ recordCount: data.recordCount });
        // });
      }
    }
  }
}