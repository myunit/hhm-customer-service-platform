/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var util = require('util');
var receiverObj = require('./object/receiverObj');

var ReceiverIFS = function (app) {
  this.DS = app.datasources.ReceiverSoap;
  Object.call(this);
};
util.inherits(ReceiverIFS, Object);
exports = module.exports = ReceiverIFS;

ReceiverIFS.prototype.addReceiverAddress = function (obj, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = receiverObj.addReceiverAddressXML(obj);
  Receiver.ReceiverForInsertAndModify(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForInsertAndModifyResult));
    } catch (e) {
      console.error('ReceiverIFS addReceiverAddress Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReceiverIFS.prototype.getReceiverAddress = function (obj, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = receiverObj.getReceiverAddressXML(obj);
  Receiver.ReceiverForGet(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForGetResult));
    } catch (e) {
      console.error('ReceiverIFS getReceiverAddress Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
