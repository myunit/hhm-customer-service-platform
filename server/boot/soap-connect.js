/**
 * @author qianqing
 * @create by 16-3-1
 * @description
 */
module.exports = function (app) {
  app.datasources.CustomerSoap.once('connected', function () {
    console.log('Customer interface is connected');
    app.datasources.CustomerSoap.createModel('Customer', {});
  });

  app.datasources.ReceiverSoap.once('connected', function () {
    console.log('Receiver interface is connected');
    app.datasources.ReceiverSoap.createModel('Receiver', {});
  });

  app.datasources.ProductSoap.once('connected', function () {
    console.log('Product interface is connected');
    app.datasources.ProductSoap.createModel('Product', {});
  });

  app.datasources.FavoriteSoap.once('connected', function () {
    console.log('Favorite interface is connected');
    app.datasources.FavoriteSoap.createModel('Favorite', {});
  });

  app.datasources.ShoppingSoap.once('connected', function () {
    console.log('Shopping interface is connected');
    app.datasources.ShoppingSoap.createModel('Shopping', {});
  });
};
