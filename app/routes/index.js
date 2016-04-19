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
    log.info(sender);
    log.info(content);
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
            let match = path.match(/\/shareRedReward\?shareRed\=(.*?)$/);
            if(!match || match.length == 0) return;
            request.post('https://m.longdai.com/grabRedReward?phone=13733987253&shareRed=' + match[1], function(err, result, body){
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(body);
            });
        });
    }
    res.end('');
});

module.exports = router;
