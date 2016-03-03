/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var xml = require('xml');

exports.addReceiverAddressXML = function (obj) {
  var address = {};
  address.sysNo = 0;
  address.address = obj.address;
  address.receiverName = obj.name;
  address.receiverMobile = '';
  address.receiverPhone = obj.phone;
  address.isDefault = obj.isDefault;
  address.uId = obj.userId;
  address.provinceId = obj.provinceId;
  address.cityId = obj.cityId;
  address.districtId = obj.districtId;
  address.province = obj.province;
  address.city = obj.city;
  address.district = obj.district;
  var xmlObj = [{
    ReceiverForInsertAndModify: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        request: JSON.stringify(address)
      }
    ]
  }];

  return xml(xmlObj, true);
};
