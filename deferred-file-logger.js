const FileLogger = require('./file-logger');
const Promise = require('bluebird');

class DeferredFileLogger extends FileLogger {

    constructor(queueLength = 1, file = 'log.txt', prefix = null, defaultLevel = 'LOG', dateFormat = 'dddd, MMMM DD YYYY, h:mm:ss'){
        super(file, prefix, defaultLevel, dateFormat);
        console.log(this.file instanceof require('fs').WriteStream);
        this.queueLength = queueLength;
        this.queue = [];
    }

    async log(message, level = this.defaultLevel){
        if (this.queue.length == this.queueLength){
            Promise.map(this.queue, currentMessage => {
                return this.file.write(currentMessage+'\n');
            }).catch(error => {
                console.error(error.message)
            });
        }
        else{
            return this.queue.push(this.format(message, level));
        }
    }
}

let logger = new DeferredFileLogger(3);
let messages = ['Hello','my','darling','bitch'];

Promise.map(messages, message => {
    return logger.log(message);
})