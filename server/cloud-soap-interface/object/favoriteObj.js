/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var xml = require('xml');

exports.addFavoriteXML = function (obj) {
  var xmlObj = [{
    FavoriteForAdd: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        productSysNo: obj.productId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.delFavoriteXML = function (obj) {
  var xmlObj = [{
    FavoriteForDelete: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        productSysNo: obj.productId
      }
    ]
  }];

  return xml(xmlObj, true);
};
