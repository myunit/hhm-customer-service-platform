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

    //获取验证码
    Customer.getCaptcha = function (data, cb) {
      if (!data.phone) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      customerIFS.getCaptcha(data, function (err, res) {
        if (err) {
          console.error('getCaptcha err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getCaptcha result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: '发送失败'});
        } else {
          cb(null, {status: 1, msg: '发送成功'});
        }
      });
    };

    Customer.remoteMethod(
      'getCaptcha',
      {
        description: ['获取验证码.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取验证码信息 {"phone":"string", "type":int}, ',
              'phone:手机号, type:类型(1:注册 2:登录 3:找回密码 4:校验 5:安全 6:异常 99:其他)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-captcha', verb: 'post'}
      }
    );

    //用户注册
    Customer.register = function (data, cb) {
      if (!data.phone) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      customerIFS.register(data, function (err, res) {
        if (err) {
          console.error('register err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('register result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, userId: res.Customer.SysNo, msg: '注册成功'});
        }
      });
    };

    Customer.remoteMethod(
      'register',
      {
        description: ['用户注册.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '注册信息 {"phone":"string", "password":"string", "code":"string"}, ',
              'code验证码'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/register', verb: 'post'}
      }
    );

  });
};
