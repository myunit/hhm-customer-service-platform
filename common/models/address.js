/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var loopback = require('loopback');
var ReceiverIFS = require('../../server/cloud-soap-interface/receiver-ifs');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function (Address) {
  Address.getApp(function (err, app) {

    var customerIFS = new CustomerIFS(app);
    var receiverIFS = new ReceiverIFS(app);

    //获取用户收货地址
    Address.getReceiver = function (data, cb) {
      receiverIFS.getReceiver(data, function (err, res) {
        if (err) {
          console.log('getReceiver err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getReceiver result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          if (data.receiverId) {
            var receivers = res.Datas;
            var len = receivers.length;
            for (var i = 0; i < len; i++) {
              if (receivers[i].SysNo === data.receiverId) {
                cb(null, {status: 1, receiver: receivers[i], msg: ''});
                return;
              }
            }
            cb(null, {status: 0, msg: '地址不存在'});
          } else {
            cb(null, {status: 1, receiver: res.Datas, msg: ''});
          }
        }
      });
    };

    Address.remoteMethod(
      'getReceiver',
      {
        description: [
          '获取用户收货地址.返回结果-status:操作结果 0 失败 1 成功, receiver:地址信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取用户收货地址 {"userId":int, "receiverId":int}',
              'receiverId:可选参数,当不传该参数时返回所有收货信息'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-receiver', verb: 'post'}
      }
    );

    //删除用户收货地址
    Address.delReceiver = function (data, cb) {
      receiverIFS.delReceiver(data, function (err, res) {
        if (err) {
          console.log('delReceiver err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('delReceiver result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '删除成功'});
        }
      });
    };

    Address.remoteMethod(
      'delReceiver',
      {
        description: [
          '删除用户收货地址.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取用户收货地址 {"userId":int, "receiverId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/del-receiver', verb: 'post'}
      }
    );

    //设置默认用户收货地址
    Address.setDefaultReceiver = function (data, cb) {
      receiverIFS.setDefaultReceiver(data, function (err, res) {
        if (err) {
          console.log('setDefaultReceiver err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('setDefaultReceiver result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '设置成功'});
        }
      });
    };

    Address.remoteMethod(
      'setDefaultReceiver',
      {
        description: [
          '设置默认用户收货地址.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户收货地址 {"userId":int, "receiverId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-default-receiver', verb: 'post'}
      }
    );

    //新增用户收货地址
    Address.addReceiver = function (data, cb) {
      receiverIFS.addReceiver(data, function (err, res) {
        if (err) {
          console.log('addReceiver err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('addReceiver result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, receiverId:res.Id, msg: '保存成功'});
        }
      });
    };

    Address.remoteMethod(
      'addReceiver',
      {
        description: ['新增用户收货地址(access token).返回结果-status:操作结果 0 失败 1 成功, addressId:地址编号, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"userId":int, "name":"string", "phone":"string", ',
              '"provinceId":int, "province":"string", "cityId":int, "city":"string", "districtId":int, ',
              '"district":"string", "street":"string", "streetId":int, "address":"string", "isDefault":boolean}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-receiver', verb: 'post'}
      }
    );

    //编辑用户收货地址
    Address.modifyReceiver = function (data, cb) {
      receiverIFS.modifyReceiver(data, function (err, res) {
        if (err) {
          console.log('modifyReceiver err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, receiverId:res.Id, msg: '保存成功'});
        }
      });
    };

    Address.remoteMethod(
      'modifyReceiver',
      {
        description: ['编辑用户收货地址(access token).返回结果-status:操作结果 0 失败 1 成功, receiverId:地址编号, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"userId":int, "receiverId":int, "name":"string", "phone":"string", ',
              '"provinceId":int, "province":"string", "cityId":int, "city":"string", "districtId":int, ',
              '"district":"string", "street":"string", "streetId":int, "address":"string", "isDefault":boolean}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-receiver', verb: 'post'}
      }
    );

    //获取省份
    Address.getAllProvinces = function (data, cb) {
      customerIFS.getAllProvinces(function (err, res) {
        if (err) {
          console.log('getAllProvinces err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getAllProvinces result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, provinces: JSON.parse(res.ResultStr), msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'getAllProvinces',
      {
        description: [
          '获取省份.返回结果-status:操作结果 0 失败 1 成功, provinces:省份信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', http: {source: 'body'},
            description: [
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-provinces', verb: 'post'}
      }
    );

    //获取城市
    Address.getAllCity = function (data, cb) {
      customerIFS.getAllCity(data, function (err, res) {
        if (err) {
          console.log('getAllCity err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getAllCity result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, city: JSON.parse(res.ResultStr), msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'getAllCity',
      {
        description: [
          '获取城市.返回结果-status:操作结果 0 失败 1 成功, city:城市信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取城市(JSON String) {"provinceId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-city', verb: 'post'}
      }
    );

    //获取行政区
    Address.getAllDistricts = function (data, cb) {
      customerIFS.getAllDistricts(data, function (err, res) {
        if (err) {
          console.log('getAllDistricts err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getAllDistricts result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, district: JSON.parse(res.ResultStr), msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'getAllDistricts',
      {
        description: [
          '获取行政区.返回结果-status:操作结果 0 失败 1 成功, district:区信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取行政区(JSON String) {"cityId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-district', verb: 'post'}
      }
    );

    //获取街道
    Address.getAllStreet = function (data, cb) {
      customerIFS.getAllStreet(data, function (err, res) {
        if (err) {
          console.log('getAllStreet err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getAllStreet result err: ' + res.ErrorInfo);
          cb(null, {status: 0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, street: JSON.parse(res.ResultStr), msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'getAllStreet',
      {
        description: [
          '获取行政区.返回结果-status:操作结果 0 失败 1 成功, street:街道信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取行政区(JSON String) {"districtId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-street', verb: 'post'}
      }
    );

  });
};
