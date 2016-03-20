var loopback = require('loopback');
var async = require('async');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');
var ReceiverIFS = require('../../server/cloud-soap-interface/receiver-ifs');
var ShoppingIFS = require('../../server/cloud-soap-interface/shopping-ifs');
var homeConfig = require('../../server/home-config');

module.exports = function(Customer) {
  Customer.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var app_self = app;
    var customerIFS = new CustomerIFS(app);
    var receiverIFS = new ReceiverIFS(app);
    var shoppingIFS = new ShoppingIFS(app);

    //完善用户信息
    Customer.perfectCustomerInfo = function (data, perfectCb) {
       async.waterfall(
        [
          function (cb) {
            customerIFS.saveStoreInfo(data, function (err, res) {
              if (err) {
                console.error('perfectCustomerInfo err: ' + err);
                cb(null, {status: 0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                console.error('perfectCustomerInfo result err: ' + res.ErrorInfo);
                cb({status: 0, msg: '操作失败'});
              } else {
                cb(null);
              }
            });
          },
          function (cb) {
            var receiver = data.receiver;
            receiver.userId = data.userId;
            receiver.isDefault = true;
            receiverIFS.addReceiver(receiver, function (err, res) {
              if (err) {
                console.error('addReceiver err: ' + err);
                cb({status:0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                console.error('addReceiver result err: ' + res.ErrorDescription);
                cb({status:0, msg: res.ErrorDescription});
              } else {
                cb(null, {status: 1, msg: '操作成功'});
              }
            });
          }
        ],
        function (err, msg) {
          if (err) {
            perfectCb(null, err);
          } else {
            perfectCb(null, msg);
          }
        }
      );
    };

    Customer.remoteMethod(
      'perfectCustomerInfo',
      {
        description: ['完善用户信息.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '完善用户信息 {"userId":int, "storeName":"string", "receiver":{"name":"string", "phone":"string", ',
              '"provinceId":int, "province":"string", "cityId":int, "city":"string", "districtId":int, "district":"string", ',
              '"address":"string"}}, ',
              'userId:用户编号, storeName:店铺名字, receiver:收货地址'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/perfect-customer-info', verb: 'post'}
      }
    );

    //获取店铺信息
    Customer.getStoreInfo = function (data, cb) {
      if (!data.userId) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      customerIFS.getStoreInfo(data, function (err, res) {
        if (err) {
          console.error('getStoreInfo err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getStoreInfo result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, store: JSON.parse(res.ResultStr), msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'getStoreInfo',
      {
        description: ['获取店铺信息.返回结果-status:操作结果 0 成功 -1 失败, store:店铺信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取店铺信息 {"userId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-store-info', verb: 'post'}
      }
    );

    //设置店铺信息
    Customer.setStoreInfo = function (data, cb) {
      if (!data.userId) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      customerIFS.saveStoreInfo(data, function (err, res) {
        if (err) {
          console.error('setStoreInfo err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('setStoreInfo result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, msg: '保存成功'});
        }
      });
    };

    Customer.remoteMethod(
      'setStoreInfo',
      {
        description: ['设置店铺信息.返回结果-status:操作结果 0 成功 -1 失败, store:店铺信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '设置店铺信息 {"userId":int, "storeName":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-store-info', verb: 'post'}
      }
    );

    //获取采购报表
    Customer.getBuyReport = function (data, cb) {
      if (!data.userId) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      customerIFS.getBuyReport(data, function (err, res) {
        if (err) {
          console.error('getBuyReport err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getBuyReport result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, report: JSON.parse(res.ResultStr), msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'getBuyReport',
      {
        description: ['获取采购报表.返回结果-status:操作结果 0 成功 -1 失败, report:报表信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取采购报表 {"userId":int, "start":"string", "end":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-buy-report', verb: 'post'}
      }
    );

    //获取用户消息通知
    Customer.getNoticeMessage = function (data, cb) {
      if (!data.userId) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      shoppingIFS.getNoticeMessage(data, function (err, res) {
        if (err) {
          console.error('getNoticeMessage err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getNoticeMessage result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          var now = new Date();
          var m = now.getMonth() + 1;
          if (m < 10) {
            m = '0' + m;
          }
          now = (new Date(now.getFullYear()+'-'+m+'-'+now.getDate())).getTime();

          var notice = JSON.parse(res.ResultStr);
          var item = null;
          var inDate = null;
          var time = 0, dif = 0;
          for (var i = 0; i < notice.rows.length; i++) {
            item = notice.rows[i];
            inDate = item.InDate.split(' ');
            time = (new Date(inDate[0])).getTime();
            dif = parseInt((now - time) / (1000 * 60 * 60 * 24));
            if (dif === 0) {
              inDate[0] = '今天';
              item.InDate = inDate.join(' ');
            } else if (dif === 1) {
              inDate[0] = '昨天';
              item.InDate = inDate.join(' ');
            }
          }
          cb(null, {status: 1, count: notice.total, notice:notice.rows, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'getNoticeMessage',
      {
        description: ['获取用户消息通知.返回结果-status:操作结果 0 成功 -1 失败, notice:消息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取用户消息通知 {"userId":int, "isRead":int, "pageId":int, "pageSize":int}',
              'isRead:消息状态, 0全部, 1未读, 2已读'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-notice-message', verb: 'post'}
      }
    );

    //设置消息状态
    Customer.setNoticeStatus = function (data, cb) {
      if (!data.userId) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      shoppingIFS.setNoticeStatus(data, function (err, res) {
        if (err) {
          console.error('setNoticeStatus err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res) {
          cb(null, {status: 0, msg: ''});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'setNoticeStatus',
      {
        description: ['设置消息状态.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '设置消息状态 {"userId":int, "isRead":boolean, "pageId":int, "pageSize":int}',
              'isRead:消息状态, true已读, false未读'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-notice-status', verb: 'post'}
      }
    );

    //获取用户未读消息总数
    Customer.getUnreadNoticeCount = function (data, cb) {
      if (!data.userId) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      shoppingIFS.getNoticeMessage({"userId":data.userId, "isRead":1, "pageId":0, "pageSize":1}, function (err, res) {
        if (err) {
          console.error('getUnreadNoticeCount err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getUnreadNoticeCount result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          var notice = JSON.parse(res.ResultStr);
          cb(null, {status: 1, count: notice.total, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'getUnreadNoticeCount',
      {
        description: ['获取用户未读消息总数.返回结果-status:操作结果 0 成功 -1 失败, count:数量, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取用户未读消息总数 {"userId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-unread-notice-count', verb: 'post'}
      }
    );

  });
};
