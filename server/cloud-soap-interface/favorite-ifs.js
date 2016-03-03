/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var util = require('util');
var favoriteObj = require('./object/favoriteObj');

var FavoriteIFS = function (app) {
  this.DS = app.datasources.FavoriteSoap;
  Object.call(this);
};
util.inherits(FavoriteIFS, Object);
exports = module.exports = FavoriteIFS;

FavoriteIFS.prototype.addFavorite = function (obj, callback) {
  var Favorite = this.DS.models.Favorite;
  var xml = favoriteObj.addFavoriteXML(obj);
  Favorite.FavoriteForAdd(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.FavoriteForAddResult));
    } catch (e) {
      console.error('FavoriteIFS addFavorite Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

FavoriteIFS.prototype.delFavorite = function (obj, callback) {
  var Favorite = this.DS.models.Favorite;
  var xml = favoriteObj.delFavoriteXML(obj);
  Favorite.FavoriteForDelete(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.FavoriteForDeleteResult));
    } catch (e) {
      console.error('FavoriteIFS delFavorite Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
