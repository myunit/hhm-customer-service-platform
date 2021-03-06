/**
 * @author qianqing
 * @create by 16-3-1
 * @description
 */
var xml = require('xml');

exports.saveStoreInfoXML = function (obj) {
  var storeJson = {};
  storeJson.CustomerSysNo = obj.userId;
  storeJson.ProductMaterial = '';
  storeJson.PurchaseAmountPerMonth = {Description:'', SysNo:0};
  storeJson.PurchaseChannel = '';
  storeJson.PurchaseFrequency = '';
  storeJson.PurchasePolicy = '';
  storeJson.SellingPrice = {Description:'', SysNo:0};
  storeJson.StoreArea = '';
  storeJson.StoreCategory = {Name:'', SysNo:0};
  storeJson.StoreDetailCategory = '';
  storeJson.StoreName = obj.storeName;
  storeJson.SysNo = 0;
  storeJson.StoreContactAddress = '';
  storeJson.StoreContactName = '';
  storeJson.StoreContactPhoneNo = '';
  storeJson.StorePCDCode = '';
  storeJson.StorePCDDescription = '';
  storeJson.StorePicture = '';

  var xmlObj = [{
    SaveCustomerStore: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        storeJson: JSON.stringify(storeJson)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getStoreInfoXML = function (obj) {
  var xmlObj = [{
    GetCustomerStoreByCustomerSysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getAllProvincesXML = function () {
  var xmlObj = [{
    GetAllProvinces: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getAllCityXML = function (obj) {
  var xmlObj = [{
    GetAllCitiesByProvince: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        provinceSysNo: obj.provinceId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getAllDistrictsXML = function (obj) {
  var xmlObj = [{
    GetAllDistrictsByCity: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        citySysNo: obj.cityId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getAllStreetXML = function (obj) {
  var xmlObj = [{
    GetAllStreetsByDistrict: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        districtSysNo: obj.districtId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getBuyReportXML = function (obj) {
  var xmlObj = [{
    GetCustomerBuyHisStatics: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        startDate: obj.start
      },
      {
        endDate: obj.end
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setHeadPictureXML = function (obj) {
  var info = {
    HeadPicture: obj.img,
    Gender: 1
  };

  var xmlObj = [{
    SaveCustomerBasic: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        basicJson: JSON.stringify(info)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getUserInfoXML = function (obj) {
  var xmlObj = [{
    GetUserById: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      }
    ]
  }];

  return xml(xmlObj, true);
};
