var redisClient = require('./store/provider-redis.js');

var Operations = function () {
  redisClient.setVariables('localhost', 6379, 'iloveredis');

};

Operations.instance = null;

Operations.getInstance = function () {
  if (this.instance === null) {
    this.instance = new Operations();
  }
  return this.instance;
};

Operations.prototype = {
  helloWorld: function (callback) {
    process.nextTick(() => {
      callback(null, 'Hello Word !!');
    });
  },
  memoryCrudOperation: function (callback) {},
  redisCrudOperation: function (callback) {
    var self = this;
    var key = 'my_class';
    var jsonObject = {_id: 12,message: 'this is an object message',title: 'this on title'};
    redisClient.exec([['SET', key, JSON.stringify(jsonObject)]], function (err, data) {
      redisClient.exec([['GET', key]], function (err, data) {
        callback(err, data);
      });
    });
  },
  MySqlCrudOperation: function (callback) {},
  MongoCrudOperation: function (callback) {}

};

module.exports = Operations.getInstance();
