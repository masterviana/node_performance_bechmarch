// 'use strict';

var redis = require('redis');

var _DEFAULT_OPTIONS = {
  parser: 'hiredis',
  return_buffers: false,
  detect_buffers: false,
  socket_nodelay: true,
  no_ready_check: false,
  enable_offline_queue: true
};

var RedisClient = function () {
  if (RedisClient.caller != RedisClient.getInstance) {
    throw new Error('This object cannot be instanciated');
  }
  this.port = 6379;
  this.host = 'localhost';
  this.options = _DEFAULT_OPTIONS;
  this.password = null;

};

RedisClient.instance = null;
RedisClient.getInstance = function () {
  if (this.instance === null) {
    this.instance = new RedisClient();
  }
  return this.instance;
};

RedisClient.prototype = {
  createClient: function (forceCreation) {
    if (forceCreation || typeof this.redisClient === 'undefined' || this.redisClient === null) {
      console.log('Create redis client!');
      this.redisClient = redis.createClient(this.port, this.host, this.options);
    }
  },
  setVariables: function (host, port, password, options) {
    this.port = port;
    this.host = host;
    this.password = password;
    this.options = typeof options === 'undefined' ? _DEFAULT_OPTIONS : options;
    // this.redisClient = redis.createClient(this.port, this.host, this.options);
    this.createClient(false);

    if (this.password && this.password.length > 0) {
      this.redisClient.auth(this.password, function (err, data) {
        if (err) {
          console.log('Auth fail', err);
        } else {
          // console.log("auth sucess");
        }
      }.bind(this));
    }
  },
  exec: function (cmds, callback) {
    // this.createClient(false);
    // var arr = [ ["lpush", "foo", "bar 0", redis.print],["rpop", "foo"],["llen", "foo"] ]
    this.redisClient.multi(cmds).exec(function (err, data) {
      console.log('get from multi on redis err:', err, ' data ', data);
      if (err) {
        console.log('error on exec:' + arr + ' error code :' + err);
        callback(err, null);
      } else {
        callback(null, data);
      }
    }.bind(this));
  },
  delKey: function (key, callback) {
    this.redisClient.del(key);
    callback(null, 'redis key was removed');
  },
  hGetAll: function (key, callback) {
    this.redisClient.hgetall(key, function (err, object) {
      callback(err, object);
    });
  },
  destroy: function () {
    this.redisClient.quit();
    this.redisClient = null;
  }
};

exports = module.exports = RedisClient.getInstance();
