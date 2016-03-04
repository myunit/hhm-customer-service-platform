/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var xml = require('xml');

exports.getMyFavoriteXML = function (obj) {
  var xmlObj = [{
    ItemForFavorite: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        page: obj.pageId
      },
      {
        pageSize: obj.pageSize
      }
    ]
  }];

  return xml(xmlObj, true);
};
