/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var util = require('util');
var productObj = require('./object/productObj');

var ProductIFS = function (app) {
  this.DS = app.datasources.ProductSoap;
  Object.call(this);
};
util.inherits(ProductIFS, Object);
exports = module.exports = ProductIFS;

ProductIFS.prototype.getMyFavorite = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = productObj.getMyFavoriteXML(obj);
  Product.ItemForFavorite(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ItemForFavoriteResult));
    } catch (e) {
      console.error('ProductIFS getMyFavorite Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
