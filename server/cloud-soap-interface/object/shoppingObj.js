/**
 * @author qianqing
 * @create by 16-3-20
 * @description
 */
var xml = require('xml');

exports.getNoticeMessageXML = function (obj) {
  var xmlObj = [{
    GetCustomerNotice: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerNo: obj.userId
      },
      {
        isRead: obj.isRead
      },
      {
        currentPage: obj.pageId
      },
      {
        pageSize: obj.pageSize
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setNoticeStatusXML = function (obj) {
  var xmlObj = [{
    CustomerReadNotice: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerNo: obj.userId
      },
      {
        IsRead: obj.isRead
      },
      {
        NoticeSysno: obj.noticeId
      }
    ]
  }];

  return xml(xmlObj, true);
};
