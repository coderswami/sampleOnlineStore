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
		var  createListState = {
			name: 'order.list.create',
			parent: 'order.list',
			url: '/create',
			onEnter: onEnterOrderListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the order.list.create state.
	 * Open the create dialog
	 */

	onEnterOrderListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterOrderListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'OrderCreateController',
			controllerAs: 'create',
			templateUrl: 'app/orders/create/create.html',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('order.list');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();
		}
	}

})();
