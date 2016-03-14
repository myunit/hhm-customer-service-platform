var loopback = require('loopback');
var async = require('async');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');
var ReceiverIFS = require('../../server/cloud-soap-interface/receiver-ifs');
var homeConfig = require('../../server/home-config');

module.exports = function(Customer) {
  Customer.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var app_self = app;
    var customerIFS = new CustomerIFS(app);
    var receiverIFS = new ReceiverIFS(app);

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

    //获取首页配置信息
    Customer.getHomeConfig = function (data, cb) {
      if (!data.project) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      var home = homeConfig[data.project];
      if (home === undefined) {
        cb(null, {status: 0, msg: '配置不存在'});
      } else {
        cb(null, {status: 0, home: home, msg: ''});
      }

    };

    Customer.remoteMethod(
      'getHomeConfig',
      {
        description: ['获取采购报表.返回结果-status:操作结果 0 成功 -1 失败, report:报表信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取采购报表 {"project":"string"}',
              'project:项目名, 好好卖是hhm'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-home-config', verb: 'post'}
      }
    );

  });
};
