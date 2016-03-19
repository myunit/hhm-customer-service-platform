/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var loopback = require('loopback');
var FavoriteIFS = require('../../server/cloud-soap-interface/favorite-ifs');
var ProductIFS = require('../../server/cloud-soap-interface/product-ifs');

module.exports = function (Favorite) {
  Favorite.getApp(function (err, app) {

    var productIFS = new ProductIFS(app);
    var favoriteIFS = new FavoriteIFS(app);

    //收藏
    Favorite.addFavorite = function (data, cb) {
      favoriteIFS.addFavorite(data, function (err, res) {
        if (err) {
          console.log('addFavorite err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('addFavorite result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '收藏成功'});
        }
      });
    };

    Favorite.remoteMethod(
      'addFavorite',
      {
        description: [
          '收藏.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '收藏 {"userId":int, "productId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-favorite', verb: 'post'}
      }
    );

    //取消收藏
    Favorite.delFavorite = function (data, cb) {
      favoriteIFS.delFavorite(data, function (err, res) {
        if (err) {
          console.log('delFavorite err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('delFavorite result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '取消成功'});
        }
      });
    };

    Favorite.remoteMethod(
      'delFavorite',
      {
        description: [
          '取消收藏.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '收藏 {"userId":int, "productId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/del-favorite', verb: 'post'}
      }
    );

    //我的收藏
    Favorite.getMyFavorite = function (data, cb) {
      productIFS.getMyFavorite(data, function (err, res) {
        if (err) {
          console.log('getMyFavorite err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getMyFavorite result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          var favorite = res.Datas;
          favorite.forEach(function (item, index) {
            if (item.SkuList.length > 1) {
              var max = item.SkuList[0].Price, min = max;
              item.SkuList.forEach(function (sItem, sIndex) {
                if (sItem.Price > max) {
                  max = sItem.Price;
                }

                if (sItem.Price < min) {
                  min = sItem.Price;
                }
              });
              item.MaxPrice = max;
              item.MinPrice = min;
            }
            item.isLike = true;
          });
          cb(null, {status: 1, count: res.Counts, favorite: favorite, msg: ''});
        }
      });
    };

    Favorite.remoteMethod(
      'getMyFavorite',
      {
        description: [
          '我的收藏.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '我的收藏 {"userId":int, "pageId":int, "pageSize":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-my-favorite', verb: 'post'}
      }
    );

  });
};
