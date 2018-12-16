const moment = require('moment');

class Logger{
    constructor(prefix = null, defaultLevel = null, dateFormat = 'dddd, MMMM DD YYYY, h:mm:ss'){
        this.prefix = prefix;
        this.defaultLevel = defaultLevel;
        this.dateFormat = dateFormat;
    }

    format(message, level = this.defaultLevel){
            return `${moment().format(this.dateFormat)}|${this.prefix}|${level}|${message}`;
    }
}

module.exports = Logger;