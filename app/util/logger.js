let log4js = require('log4js');

Object.defineProperty(global, '__stack', {
  get: function () {
    let orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    let err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    let stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function () {
    return __stack[1].getLineNumber();
  }
});

log4js.configure({
  appenders: {
    out: {type: 'stdout'},
    app: {type: 'file', filename: 'logs/application.log'}
  },
  categories: {
    default: {appenders: ['out', 'app'], level: 'debug'}
  }
});


levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL
}

exports.logger = function (name) {
  return log4js.getLogger(name);
}
