var fs = require('fs');
var settings = require('./config/app/settings.json');
var config = require('./config/app/config.json');

Date.prototype.getMonthFormatted = function () {
  var month = this.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month;
};

Date.prototype.getMonthFormattedString = function () {
  switch (this.getMonth()) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
  }
  return month < 10 ? '0' + month : '' + month;
};

Date.prototype.getDayFormatted = function () {
  var day = this.getDate();
  return day < 10 ? '0' + day : '' + day;
};

Date.prototype.getHourFormatted = function () {
  var hour = this.getHours();
  return hour < 10 ? '0' + hour : '' + hour;
};

Date.prototype.getMinuteFormatted = function () {
  var minute = this.getMinutes();
  return minute < 10 ? '0' + minute : '' + minute;
};

Date.prototype.getSecondFormatted = function () {
  var second = this.getSeconds();
  return second < 10 ? '0' + second : '' + second;
};

Date.prototype.getFormatedDateTime = function () {
  return (
    this.getDayFormatted() +
    '/' +
    this.getMonthFormatted() +
    '/' +
    this.getFullYear() +
    ' ' +
    this.getHourFormatted() +
    ':' +
    this.getMinuteFormatted() +
    ':' +
    this.getSecondFormatted()
  );
};

Date.prototype.getDateTimeFormatted = function () {
  return `${this.getMonthFormattedString()} ${this.getDayFormatted()} ${this.getFullYear()} ${this.getHourFormatted()}:${this.getMinuteFormatted()}:${this.getSecondFormatted()}`;
};

var dir = process.cwd() + '/logs';
var d = new Date();
var todaysDate =
  d.getDayFormatted() + '' + d.getMonthFormatted() + '' + d.getFullYear();
var logFileName = dir + '/debug_' + todaysDate + '.txt';
var initMessage =
  '============================================\nInitialized logger\n==================================================\n';
//var dir = '../logs';

module.exports.init = function () {
  if (config.logEnabled) {
    console.info('logger module initialized successfully!');
    // For uncaughtException Log
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (!fs.existsSync(logFileName)) {
      fs.appendFile(logFileName, initMessage, function (err) {
        if (err) {
          // return module.exports.writeLine(enums.consoleColor.yellow + "%s" + enums.consoleColor.reset, err);
        }
      });
    } else {
      let message =
        '============================================\n RUN the application on' +
        new Date() +
        '\n==================================================\n';
      fs.appendFile(logFileName, message, function (err) {
        if (err) {
          //return module.exports.writeLine(enums.consoleColor.yellow + "%s" + enums.consoleColor.reset, err);
        }
      });
    }
  }
};

module.exports.logFile = function (logMessage) {
  if (config.logEnabled) {
    logMessage = logMessage + ' \n';
    fs.appendFile(logFileName, JSON.stringify(logMessage), function (err) {
      if (err) {
        // return module.exports.writeLine(enums.consoleColor.yellow + "%s" + enums.consoleColor.reset, err);
      }
    });
  }
};
