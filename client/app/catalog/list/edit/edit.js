(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.catalog.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires sampleOnlineStoreApp.mongooseError
	 * @requires sampleOnlineStoreApp.catalog.service
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.list.edit', [
			'ui.router',
			'ngMaterial',
			'sampleOnlineStoreApp.mongooseError',
			'sampleOnlineStoreApp.catalog.service'
		])
		.config(configureCatalogListEdit);

	// inject configCatalogListEdit dependencies
	configureCatalogListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the catalog.list.edit state with the edit template
	 * paired with the CatalogEditController as 'edit' for the
	 * 'detail@catalog.list' view.
	 * 'catalog' is resolved as the catalog with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureCatalogListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'catalog.list.edit',
			parent: 'catalog.list',
			url: '/edit/:id',
			onEnter: onEnterCatalogListEdit,
			views: {
				'detail@catalog.list': {
					templateUrl: 'app/catalog/list/edit/edit.html',
					controller: 'CatalogEditController',
					controllerAs: 'edit',
					resolve: {catalog: resolveCatalogFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onCatalogListEditEnter dependencies
	onEnterCatalogListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the catalog.list.detail state. Open the component
	 * registered with the component id 'catalog.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterCatalogListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('catalog.detailView').open();
		}
	}

	// inject resolveCatalogDetailRoute dependencies
	resolveCatalogFromArray.$inject = ['catalogs', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the catalog.list.edit state. Get the catalog
	 * from the injected Array of catalogs by using the '_id' property.
	 *
	 * @params {Array} catalogs - The array of catalogs
	 * @params {Object} $stateParams - The $stateParams to read the catalog id from
	 * @params {Object} _ - The lodash service to find the requested catalog
	 * @returns {Object|null} The catalog whose value of the _id property equals $stateParams._id
	 */
	function resolveCatalogFromArray(catalogs, $stateParams, _) {
		//	return Catalog.get({id: $stateParams.id}).$promise;
		return _.find(catalogs, {'_id': $stateParams.id});
	}

})();
