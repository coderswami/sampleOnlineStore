(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.order.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {sampleOnlineStoreApp.mongooseError}
	 * @requires {sampleOnlineStoreApp.remoteUnique}
	 * @requires {sampleOnlineStoreApp.order.service}
	 */

	angular
		.module('sampleOnlineStoreApp.order.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'sampleOnlineStoreApp.mongooseError',
			'sampleOnlineStoreApp.remoteUnique',
			'sampleOnlineStoreApp.order.service'
		])
		.config(configureOrderCreateRoutes);

	// inject configOrder.CreateRoutes dependencies
	configureOrderCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'order.list.create' state. The onEnterOrderListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app/orders/create/create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureOrderCreateRoutes($stateProvider) {
		var createListState = {
			name: 'order.list.create',
			parent: 'order.list',
			url: '/create',
			resolve: {
				country: resolveActiveCountry,
				states: resolveStatesForCountry
			},
			views: {
				'content@order.list': {
					templateUrl: 'app/orders/create/create.html',
					controller: 'OrderCreateController',
					controllerAs: 'create'
				}
			}
		};

		$stateProvider.state(createListState);
	}

	resolveActiveCountry.$inject = ['Catalog'];

	function resolveActiveCountry(Catalog) {
		return Catalog.getCountryByCode({controller: 'IN'}).$promise.then(function(result) {
			console.log(result);
			return result;
		});
	}

	resolveStatesForCountry.$inject = ['Catalog', 'country'];

	function resolveStatesForCountry(Catalog, country) {
		return Catalog.getStatesByCountry({controller: country.id}).$promise.then(function(results) {
			console.log(results);
			return results;
		})
	}

})();
