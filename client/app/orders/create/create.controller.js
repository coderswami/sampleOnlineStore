/**
 * @ngdoc controller
 * @name sampleOnlineStoreApp.order.create.controller:OrderCreateController
 * @description
 * Controller of the order create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as OrderCreateController
	 */

	angular
		.module('sampleOnlineStoreApp.order.create')
		.controller('OrderCreateController', OrderCreateController);

	/**
	 * @ngdoc function
	 * @name sampleOnlineStoreApp.order.create.provider:OrderCreateController
	 * @description
	 * Provider of the {@link sampleOnlineStoreApp.order.create.controller:OrderCreateController OrderCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Order The Order resource
	 * @param {Service} OrderService The Order service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link sampleOnlineStoreApp.order.create.controller:OrderCreateController OrderCreateController}
	 */

	OrderCreateController.$inject = ['$mdDialog', 'Order', 'OrderService', 'Toast'];

	function OrderCreateController($mdDialog, Order, OrderService, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name order
		 * @propertyOf sampleOnlineStoreApp.order.create.controller:OrderCreateController
		 * @description
		 * The new order data
		 *
		 * @returns {Object} The order data
		 */
		vm.order = new Order();

		// view model bindings (documented below)
		vm.create = createOrder;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name createOrder
		 * @methodOf sampleOnlineStoreApp.order.create.controller:OrderCreateController
		 * @description
		 * Create a new order by using the OrderService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createOrder(form) {
			// refuse to work with invalid data
			if (vm.order._id || (form && !form.$valid)) {
				return;
			}

			OrderService.create(vm.order)
				.then(createOrderSuccess)
				.catch(createOrderCatch);

			function createOrderSuccess(newOrder) {
				Toast.show({
					type: 'success',
					text: 'Order ' + newOrder.name + ' has been created',
					link: {state: 'order.list.detail', params: {id: newOrder._id}}
				});
				vm.close();
			}

			function createOrderCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new Order'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf sampleOnlineStoreApp.order.create.controller:OrderCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf sampleOnlineStoreApp.order.create.controller:OrderCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
