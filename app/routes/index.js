'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var log = require('../logger');
/* GET home page. */
/*router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
 });*/

router.post('/redbag', function (req, res, next) {
    let content = req.body.content;
    let sender = req.body.sender;
    let group = req.body.group;
    log.info(sender);
    log.info(content);
    log.info(group);
    if(group.indexOf('开发')!=-1 || group.indexOf('客服')!=-1 || group.indexOf('龙聚宝')!=-1 || group.indexOf('项目')!=-1) {
        log.info('内部群不能领');
        return res.end('');
    }
    if(!content || !sender) return res.end('');
    //var content = req.query.content;
    let matches = content.match(/http[s]?:\/\/[a-zA-z\.\?\=\/0-9]+/g);
    if (!matches || matches.length == 0) return res.end('');
    for(let i = 0; i < matches.length; i++){
        request.head(matches[i], function(err, response, body){
            if(!response.req) return res.end('');
            var path = response.req.path;
            log.info(path);
            if(!path) return;
            //let match = path.match(/\/shareRedReward\?shareRed\=(.*?)$/);
            //if(!match || match.length == 0) return;
            let match = path.split('/');
            let phonesString = process.env['PHONES'] || ['13733987253'];
            let phones = phonesString.split('|');
            phones.forEach(function(phone){
                request.post('https://m.longdai.com/grabRedReward?phone=' + phone + '&shareRed=' + match[match.length - 1], function(err, result, body){
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(body);
                });
            });
        });
    }
    res.end('');
});

module.exports = router;
