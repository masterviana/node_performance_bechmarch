var process = require('process');

var Operations = function () {};

Operations.instance = null;

Operations.getInstance = function () {
  if (this.instance === null) {
    this.instance = new Operations();
  }
  return this.instance;
};

Operations.prototype = {
  helloWorld: function (callback) {
    process.nextTicket(callback(null, 'Hello Word !!'));
  },
  memoryCrudOperation: function (callback) {},
  redisCrudOperation: function (callback) {},
  MySqlCrudOperation: function (callback) {},
  MongoCrudOperation: function (callback) {}

};
