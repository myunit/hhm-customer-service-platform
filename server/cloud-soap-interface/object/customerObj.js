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
