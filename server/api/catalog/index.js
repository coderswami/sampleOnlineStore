/**
 * Module for handling catalog requests.
 * Initializing the [CatalogController]{@link catalog:controller~CatalogController}
 * and configuring the express router to handle the catalog api
 * for /api/catalogs routes. All Routes are registered after the
 * [request parameters]{@link catalog:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the catalog api routes
 * @module {express.Router} catalog
 * @requires {@link module:middleware}
 * @requires {@link catalog:controller~CatalogController}
 */
'use strict';

var router = require('express').Router();
var middleware = require('../../lib/middleware');
var CatalogController = require('./catalog.controller');
// Export the configured express router for the catalog api routes
module.exports = router;

/**
 * The api controller
 * @type {catalog:controller~CatalogController}
 */
var controller = new CatalogController(router);

// register catalog route parameters, uncomment if needed
// var registerCatalogParameters = require('./catalog.params');
// registerCatalogParameters(router);

// register catalog routes
router.route('/')
	.get(controller.index);

router.route('/countries/:countryCode')
	.get(controller.getCountryByCode);

router.route('/countries/:id/states')
	.get(controller.getStatesByCountry);

router.route('/active/:countryCode')
	.get(controller.getActiveCatalog);

router.route('/:id/categories')
	.get(controller.getCategories);

router.route('/:id/categories/:categoryId/products')
	.get(controller.getProducts);

router.route('/product/:id/price')
	.get(controller.getActiveProductPrice);

router.route('/' + controller.paramString)
	.get(controller.index);
