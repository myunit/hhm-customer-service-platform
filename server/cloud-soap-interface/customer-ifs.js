/**
 * @author qianqing
 * @create by 16-3-1
 * @description
 */
var util = require('util');
var customerObj = require('./object/customerObj');

var CustomerIFS = function (app) {
  this.DS = app.datasources.CustomerSoap;
  Object.call(this);
};
util.inherits(CustomerIFS, Object);
exports = module.exports = CustomerIFS;

CustomerIFS.prototype.getCaptcha = function (data, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getCaptchaXML(data);
  Customer.SendVerificationCode(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SendVerificationCodeResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.register = function (data, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.registerXML(data);
  Customer.RegisterByVerCode(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.RegisterByVerCodeResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
