/**
 * Created by linfeiyang on 3/22/16.
 */

var winston = require('winston');
var moment = require('moment');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'info',
            timestamp: function() {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        })
    ]
});
module.exports = logger;