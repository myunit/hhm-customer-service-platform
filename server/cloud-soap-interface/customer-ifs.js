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

CustomerIFS.prototype.getAllCity = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getAllCityXML(obj);
  Customer.GetAllCitiesByProvince(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllCitiesByProvinceResult));
    } catch (e) {
      console.error('CustomerIFS getAllCity Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getAllDistricts = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getAllDistrictsXML(obj);
  Customer.GetAllDistrictsByCity(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllDistrictsByCityResult));
    } catch (e) {
      console.error('CustomerIFS getAllDistricts Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getAllStreet = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getAllStreetXML(obj);
  Customer.GetAllStreetsByDistrict(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllStreetsByDistrictResult));
    } catch (e) {
      console.error('CustomerIFS getAllStreet Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getBuyReport = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getBuyReportXML(obj);
  Customer.GetCustomerBuyHisStatics(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCustomerBuyHisStaticsResult));
    } catch (e) {
      console.error('CustomerIFS getBuyReport Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.setHeadPicture = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.setHeadPictureXML(obj);
  Customer.SaveCustomerBasic(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SaveCustomerBasicResult));
    } catch (e) {
      console.error('CustomerIFS setHeadPicture Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};

CustomerIFS.prototype.getUserInfo = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = customerObj.getUserInfoXML(obj);
  Customer.GetUserById(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetUserByIdResult));
    } catch (e) {
      console.error('CustomerIFS getUserInfo Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorInfo:'服务异常'});
    }
  });
};
