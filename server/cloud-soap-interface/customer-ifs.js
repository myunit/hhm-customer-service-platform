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

CustomerIFS.prototype.saveStoreInfo = function (data, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.saveStoreInfoXML(data);
  Customer.SaveCustomerStore(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SaveCustomerStoreResult));
    } catch (e) {
      console.error('CustomerIFS saveStoreInfo Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getStoreInfo = function (data, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getStoreInfoXML(data);
  Customer.GetCustomerStoreByCustomerSysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCustomerStoreByCustomerSysNoResult));
    } catch (e) {
      console.error('CustomerIFS getStoreInfo Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getAllProvinces = function (callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getAllProvincesXML();
  Customer.GetAllProvinces(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllProvincesResult));
    } catch (e) {
      console.error('CustomerIFS getAllProvinces Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};
