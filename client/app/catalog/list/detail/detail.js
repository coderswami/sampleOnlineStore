(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.catalog.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configureCatalogListDetail);

	// inject configCatalogRoutes dependencies
	configureCatalogListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'catalog.detail' state with the detail template
	 * paired with the CatalogDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'catalog' is resolved as the catalog with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureCatalogListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'catalog.list.detail',
			parent: 'catalog.list',
			url: '/product/:productId',
			//onEnter: onEnterCatalogListDetail,
			views: {
				'content@catalog.list': {
					templateUrl: 'app/catalog/list/detail/detail.html',
					controller: 'CatalogDetailController',
					controllerAs: 'detail',
					resolve: {
						product: resolveProductFromArray
					}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// // inject onCatalogListDetailEnter dependencies
	// onEnterCatalogListDetail.$inject = ['$timeout', 'ToggleComponent'];
    //
	// /**
	//  * Executed when entering the catalog.list.detail state. Open the component
	//  * registered with the component id 'catalog.detailView'.
	//  *
 	//  * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	//  * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	//  */
	// function onEnterCatalogListDetail($timeout, ToggleComponent) {
	// 	$timeout(showDetails, 0, false);
    //
	// 	function showDetails() {
	// 		ToggleComponent('catalog.detailView').open();
	// 	}
	// }

	// inject resolveCatalogFromArray dependencies
	resolveProductFromArray.$inject = ['products', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the catalog.detail state
	 *
	 * @params {Array} catalogs - The array of catalogs
	 * @params {Object} $stateParams - The $stateParams to read the catalog id from
	 * @returns {Object|null} The catalog whose value of the _id property equals $stateParams._id
	 */
	function resolveProductFromArray(products, $stateParams, _) {
		for(var i in products) {
			if(products[i].id == $stateParams.productId) {
				return products[i];
			}
		}
	}

})();
