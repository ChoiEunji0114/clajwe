const request = require('request');

module.exports = function() {
    function API_Call() {
        var OPTIONS = {
            headers: {'Content-Type' : 'application/json'},
            url:null,
            body: null
        };
        const HOST = 'http://3.19.244.221:8080'
        return {
            createWallet: function(callback){
                OPTIONS.url = HOST+'/wallets';
                OPTIONS.body = JSON.stringify();
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            saveWallet: function(address, callback) {
                OPTIONS.url = HOST+'/wallets/save';
                OPTIONS.body = JSON.stringify({
                    "address": address
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            }
        };
    }


    function statusCodeErrorHandler(statusCode, callback, data){
        switch(statusCode) {
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
        }
    }

    var INSTANCE;

    if(INSTANCE == undefined){
        INSTANCE = new API_Call();
    }
    return INSTANCE;

};