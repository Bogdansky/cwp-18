const Logger = require('./logger');
const moment = require('moment');
const levels = ['LOG','INFO','WARN','ERROR'];

class ConsoleLogger extends Logger {

    constructor(prefix = null, defaultLevel = 'LOG', dateFormat = 'dddd, MMMM DD YYYY, h:mm:ss'){
        super(prefix,defaultLevel,dateFormat);
    }

    format(message, level){
        return `${moment().format(this.dateFormat)}|${this.prefix}|${message}`;
    }

    log(message, level){
        switch(level){
            case 'LOG':
                console.log(this.format(message,level));
                break;
            case 'INFO':
                console.info(this.format(message,level));
                break;
            case 'WARN':
                console.warn(this.format(message,level));
                break;
            case 'ERROR':
                console.error(this.format(message,level));
                break;
            default: 
                this.log(message, this.defaultLevel);
        }
    }
}

module.exports = ConsoleLogger;