/**
 * Module for handling user requests.
 * Initializing the [UserController]{@link user:controller~UserController}
 * and configuring the express router to handle the user api
 * for /api/users routes. Authentication middleware is added to
 * all requests except the '/' route - where everyone can POST to.
 * Export the configured express router for the user api routes
 * @module {express.Router}
 * @requires {request-context}
 * @requires {@link user:controller}
 * @requires {@link auth:service}
 */
'use strict';

var router = require('express').Router();
var UserController = require('./user.controller');

// Export the configured express router for the user api routes
module.exports = router;

/**
 * The api controller
 * @type {user:controller~UserController}
 */
var controller = new UserController(router);

//user profile from datasource
router.route('/:id/profile')
	.get(controller.getUserProfile);

router.route('/address')
	.put(controller.saveUserAddress);
