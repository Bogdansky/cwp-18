const Logger = require('./logger');
const fs = require('fs');
const moment = require('moment');
const logPath = 'log.txt';

class FileLogger extends Logger {

    constructor(file = logPath, prefix = null, defaultLevel = 'LOG', dateFormat = 'dddd, MMMM DD YYYY, h:mm:ss'){
        super(prefix, defaultLevel, dateFormat);
        this.file = file instanceof fs.WriteStream ? file : fs.createWriteStream(file);
    }   

    async log(message, level = this.defaultLevel){
        return this.file.write(this.format(message, level)+'\n');
    }

    close(){
        this.file.destroy();
    }
}

module.exports = FileLogger;