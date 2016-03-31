/**
 * Module for the controller definition of the user api.
 * The UserController is handling /api/users requests.
 * @module {user:controller~UserController} user:controller
 * @requires {@link module:config}
 * @requires {@link ParamController}
 */
'use strict';

var _ = require('lodash');
var ParamController = require('../../lib/controllers/param.controller');
var config = require('../../config');
var UserAPI = require('../../datasources/userDS');
var async = require('async');

/**
 * The User model instance
 * @type {user:model~User}
 */
//var User = require('./user.model').model;

exports = module.exports = UserController;

/**
 * UserController constructor
 * @classdesc Controller that handles /api/users route requests
 * for the user api.
 * Uses the 'id' parameter and the 'user' request property
 * to operate with the [main user API Model]{@link user:model~User} model.
 * @constructor
 * @inherits ParamController
 * @see user:model~User
 */
function UserController(router) {
	// ParamController.call(this, User, 'id', 'userDocument', router);
	// this.select = ['-salt', '-hashedPassword'];
	// this.omit = ['salt', 'hashedPassword'];
	// this.defaultReturn = 'profile';
}

UserController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: UserController,

	getUserProfile : function(req,res){
		var userId = req.params.id;
		UserAPI.getUserProfile(userId,null,function(err, response, body){
			console.log(body);
			res.json(body);
		});
	},

	saveUserAddress : function(req,res){
		UserAPI.saveUserAddress(req.body,null,function(err, response, body){
			console.log(body);
			res.json(body);
		});
	}
};

UserController.prototype = _.create(ParamController.prototype, UserController.prototype);
