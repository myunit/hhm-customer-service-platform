var loopback = require('loopback');
var async = require('async');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function(Customer) {
  Customer.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var app_self = app;
    var customerIFS = new CustomerIFS(app);

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

              console.log('res: ' + JSON.stringify(res));
              if (!res.IsSuccess) {
                console.error('perfectCustomerInfo result err: ' + res.ErrorInfo);
                cb({status: 0, msg: '操作失败'});
              } else {
                cb(null, {status: 1, msg: '操作成功'});
              }
            });
          }/*,
          function (cb) {
            customerIFS.login(data, function (err, res) {
              if (err) {
                console.error('login err: ' + err);
                cb({status:0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                console.error('login result err: ' + res.ErrorDescription);
                cb({status:0, msg: res.ErrorDescription});
              } else {
                cb(null, {status: 1, customer: res.Customer, msg: ''});
              }
            });
          }*/
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
              '获取验证码信息 {"userId":int, "storeName":"string"}, ',
              'userId:用户编号, storeName:店铺名字'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/perfect-customer-info', verb: 'post'}
      }
    );

  });
};
