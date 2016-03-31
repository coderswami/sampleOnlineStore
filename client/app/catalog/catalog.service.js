(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.catalog.service module.
	 * Register the catalog resource as Catalog, register the
	 * service as CatalogService.
	 *
	 * @requires {sampleOnlineStoreApp.resource}
	 */
	angular
		.module('sampleOnlineStoreApp.catalog.service', ['sampleOnlineStoreApp.resource'])
		.factory('Catalog', Catalog)
		.service('CatalogService', CatalogService);

	// add Catalog dependencies to inject
	Catalog.$inject = ['Resource'];

	/**
	 * Catalog resource constructor
	 */
	function Catalog($resource) {
		// factory members
		var apiURL = '/api/catalog';

		var methods = {
			'getCountryByCode': {
				method: 'GET',
				params: {'id': 'countries'},
				transformResponse: function (data) {
					data = angular.fromJson(data);
					return data;
				}
			},
			'getStatesByCountry': {
				method: 'GET',
				params: {'id': 'countries', 'id2': 'states'},
				isArray: true,
				transformResponse: function (data) {
					data = angular.fromJson(data);
					return data;
				}
			},
			'getActiveCatalog': {
				method: 'GET',
				params: {'id': 'active'}
				// transformResponse: function (data) {
				// 	data = angular.fromJson(data);
				// 	return data;
				// }
			},
			'getCategoriesByCatalog': {
				method: 'GET',
				params: {'controller': 'categories'},
				isArray: true,
				transformResponse: function (data) {
					data = angular.fromJson(data);
					return data;
				}
			},
			'getProductsByCategory': {
				method: 'GET',
				params: {
					'controller': 'categories',
					'controller2': 'products'
				},
				isArray: true,
				transformResponse: function (data) {
					data = angular.fromJson(data);
					return data;
				}
			}
		};
		// public API
		return $resource(apiURL + '/:id/:controller/:id2/:controller2', {}, methods);
	}

	// add CatalogService dependencies to inject
	CatalogService.$inject = ['Catalog'];

	/**
	 * CatalogService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} Catalog The resource provided by sampleOnlineStoreApp.catalog.resource
	 * @returns {Object} The service definition for the CatalogService service
	 */
	function CatalogService(Catalog) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new catalog
		 *
		 * @param  {Object}   catalog - catalogData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(catalog, callback) {
			var cb = callback || angular.noop;

			return Catalog.create(catalog,
				function (catalog) {
					return cb(catalog);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a catalog
		 *
		 * @param  {Object}   catalog - catalogData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(catalog, callback) {
			var cb = callback || angular.noop;

			return Catalog.remove({id: catalog._id},
				function (catalog) {
					return cb(catalog);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new catalog
		 *
		 * @param  {Object}   catalog - catalogData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(catalog, callback) {
			var cb = callback || angular.noop;

			return Catalog.update(catalog,
				function (catalog) {
					return cb(catalog);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
