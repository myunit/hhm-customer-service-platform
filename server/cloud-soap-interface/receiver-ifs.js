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

ReceiverIFS.prototype.addReceiver = function (obj, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = receiverObj.addReceiverXML(obj);
  Receiver.ReceiverForInsertAndModify(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForInsertAndModifyResult));
    } catch (e) {
      console.error('ReceiverIFS addReceiver Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReceiverIFS.prototype.modifyReceiver = function (obj, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = receiverObj.modifyReceiverXML(obj);
  Receiver.ReceiverForInsertAndModify(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForInsertAndModifyResult));
    } catch (e) {
      console.error('ReceiverIFS modifyReceiver Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReceiverIFS.prototype.getReceiver = function (obj, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = receiverObj.getReceiverXML(obj);
  Receiver.ReceiverForGet(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForGetResult));
    } catch (e) {
      console.error('ReceiverIFS getReceiver Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReceiverIFS.prototype.delReceiver = function (obj, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = receiverObj.delReceiverXML(obj);
  Receiver.ReceiverForDelete(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForDeleteResult));
    } catch (e) {
      console.error('ReceiverIFS delReceiver Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ReceiverIFS.prototype.setDefaultReceiver = function (obj, callback) {
  var Receiver = this.DS.models.Receiver;
  var xml = receiverObj.setDefaultReceiverXML(obj);
  Receiver.ReceiverForSetDefault(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ReceiverForSetDefaultResult));
    } catch (e) {
      console.error('ReceiverIFS setDefaultReceiver Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
