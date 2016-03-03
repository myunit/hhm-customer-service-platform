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
};
