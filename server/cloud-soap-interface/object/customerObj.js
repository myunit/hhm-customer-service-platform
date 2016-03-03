/**
 * @author qianqing
 * @create by 16-3-1
 * @description
 */
var xml = require('xml');

exports.getCaptchaXML = function (obj) {
  var xmlObj = [{
    SendVerificationCode: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        sendUserId: '496'
      },
      {
        sendPassword: '123'
      },
      {
        sendType: obj.type
      },
      {
        toMobile: obj.phone
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.registerXML = function (obj) {
  var sex = 'man';
  if (obj.sex === 2) {
    sex = 'woman'
  }

  var xmlObj = [{
    RegisterByVerCode: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        cellPhoneNo: obj.phone
      },
      {
        passWord: obj.password
      },
      {
        ename: ''
      },
      {
        memberName: ''
      },
      {
        sex: sex
      },
      {
        userLink: ''
      },
      {
        vercode: obj.code
      }
    ]
  }];

  return xml(xmlObj, true);
};
