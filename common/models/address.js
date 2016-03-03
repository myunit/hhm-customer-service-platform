/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var loopback = require('loopback');
var ReceiverIFS = require('../../server/cloud-soap-interface/receiver-ifs');

module.exports = function (Address) {
  Address.getApp(function (err, app) {

    var receiverIFS = new ReceiverIFS(app);

    //获取用户收货地址
    Address.getReceiverAddress = function (data, cb) {
      receiverIFS.getReceiverAddress(data, function (err, res) {
        if (err) {
          console.log('getReceiverAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('setStoreInfo result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, receiver: res.Datas, msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'getReceiverAddress',
      {
        description: [
          '获取用户收货地址.返回结果-status:操作结果 0 失败 1 成功, receiver:地址信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取用户收货地址 {"userId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-receiver-address', verb: 'post'}
      }
    );
  });
};
