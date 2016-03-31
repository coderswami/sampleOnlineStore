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

dataSources.getCartOrder = function(cookie,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/orderHeaders/type/cart/'+cookie;
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

dataSources.createOrder = function(order,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/orderHeaders';
            if(headers && headers !== null){
                request.post({url:url,headers:headers,json:true,body:order},cb);
            }else{
                request.post({url:url,json:true,body:order},cb);
            }
        }else{
            cb.apply(this,[null,null,{errorCode:err,errorMessage:'Service Not Found'}]);
        }
    });
};

dataSources.getOrderItemsByOrder = function(orderId,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/orderItems/orderHeader/'+orderId;
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

dataSources.saveOrderItem = function(orderItem,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/orderItems';
            if(headers && headers !== null){
                request.put({url:url,headers:headers,json:true,body:orderItem},cb);
            }else{
                request.put({url:url,json:true,body:orderItem},cb);
            }
        }else{
            cb.apply(this,[null,null,{errorCode:err,errorMessage:'Service Not Found'}]);
        }
    });
};

dataSources.createPayment = function(orderId,payment,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/payments/order/'+orderId;
            if(headers && headers !== null){
                request.post({url:url,headers:headers,json:true,body:payment},cb);
            }else{
                request.post({url:url,json:true,body:payment},cb);
            }
        }else{
            cb.apply(this,[null,null,{errorCode:err,errorMessage:'Service Not Found'}]);
        }
    });
};

dataSources.createShipment = function(orderId,shipment,headers,cb){
    return this.processServiceRequest(function(apiUrl,err){
        if(!err){
            var url = apiUrl+'/api/shipments/order/'+orderId;
            if(headers && headers !== null){
                request.post({url:url,headers:headers,json:true,body:shipment},cb);
            }else{
                request.post({url:url,json:true,body:shipment},cb);
            }
        }else{
            cb.apply(this,[null,null,{errorCode:err,errorMessage:'Service Not Found'}]);
        }
    });
};
