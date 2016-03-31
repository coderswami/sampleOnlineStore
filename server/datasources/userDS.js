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

dataSources.createUserProfile = function(userProfile,headers,cb){
	return this.processServiceRequest(function(apiUrl,err){
		if(!err){
			var url = apiUrl+'/api/userProfiles';
			if(headers && headers !== null){
				request.post({url:url,headers:headers,json:true,body:userProfile},cb);
			}else{
				request.post({url:url,json:true,body:userProfile},cb);
			}
		}else{
			cb.apply(this,[null,null,{errorCode:err,errorMessage:'Service Not Found'}]);
		}
	});
};

dataSources.getUserProfile = function(userId,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/userProfiles/'+userId;
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

dataSources.saveUserAddress = function(address,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/userAddresss';
            if(headers && headers !== null){
                request.put({url:url,headers:headers,json:true,body:address},cb);
            }else{
                request.put({url:url,json:true,body:address},cb);
            }
        }else{
            cb.apply(this,[null,null,{errorCode:err,errorMessage:'Service Not Found'}]);
        }
    });
};
