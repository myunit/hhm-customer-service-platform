/**
 * @author qianqing
 * @create by 16-3-20
 * @description
 */
var util = require('util');
var shoppingObj = require('./object/shoppingObj');

var ShoppingIFS = function (app) {
  this.DS = app.datasources.ShoppingSoap;
  Object.call(this);
};
util.inherits(ShoppingIFS, Object);
exports = module.exports = ShoppingIFS;

ShoppingIFS.prototype.getNoticeMessage = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = shoppingObj.getNoticeMessageXML(obj);
  Shopping.GetCustomerNotice(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCustomerNoticeResult));
    } catch (e) {
      console.error('ShoppingIFS getNoticeMessage Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ShoppingIFS.prototype.setNoticeStatus = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = shoppingObj.setNoticeStatusXML(obj);
  Shopping.CustomerReadNotice(xml, function (err, response) {
    try {
      callback(err, response.CustomerReadNoticeResult);
    } catch (e) {
      console.error('ShoppingIFS setNoticeStatus Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
