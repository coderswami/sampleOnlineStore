'use strict';

var request = require('request');
var dataSources = {};

module.exports = dataSources

   
dataSources.processServiceRequest = function(cb){
    var host = 'localhost';
    var port = '9898';
    var apiUrl = 'http://'+host+':'+port;
    return cb.apply(this,[apiUrl]);
};

dataSources.getUserLogin = function(username,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/userLogins/'+username;
            if(headers && headers !== null){
                request.get({url:url,headers:headers,json:true},cb);
            }else{
                request.get({url:url,json:true},cb);
            }
        }else{
            cb.apply(this,[null,null,{errorCode:err,errorMessage:'Service Not Found'}]);
        }
    });
};