/**
 * Created by linfeiyang on 3/22/16.
 */

var winston = require('winston');
var moment = require('moment');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            level: 'info',
            timestamp: function() {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            },
            filename: './log/node-redbag.log'
        })
    ]
});
module.exports = logger;
