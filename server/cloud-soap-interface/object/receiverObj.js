/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var xml = require('xml');

exports.addReceiverXML = function (obj) {
  var address = {};
  address.sysNo = 0;
  address.address = obj.address;
  address.receiverName = obj.name;
  address.receiverMobile = obj.phone;
  address.receiverPhone = '';
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

exports.modifyReceiverXML = function (obj) {
  var address = {};
  address.sysNo = obj.receiverId;
  address.address = obj.address;
  address.receiverName = obj.name;
  address.receiverMobile = obj.phone;
  address.receiverPhone = '';
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

exports.getReceiverXML = function (obj) {
  var xmlObj = [{
    ReceiverForGet: [
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

exports.delReceiverXML = function (obj) {
  var xmlObj = [{
    ReceiverForDelete: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        rId: obj.receiverId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setDefaultReceiverXML = function (obj) {
  var xmlObj = [{
    ReceiverForSetDefault: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        rId: obj.receiverId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getPCDListXML = function (type, id) {
  if (type === 1) {
    type = 'city';
  } else if (type === 2) {
    type = 'district';
  } else {
    type = '';
  }

  var xmlObj = [{
    QueryPCDList: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        type: type
      },
      {
        id: id
      }
    ]
  }];

  return xml(xmlObj, true);
};
