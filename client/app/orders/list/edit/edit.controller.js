/**
 * @ngdoc controller
 * @name sampleOnlineStoreApporder.list.edit.controller:OrderEditController
 * @description
 * Controller of the order edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as OrderEditController
	 */

	angular
		.module('sampleOnlineStoreApp.order.list.edit')
		.controller('OrderEditController', OrderEditController);

	/**
	 * @ngdoc function
	 * @name sampleOnlineStoreApporder.list.edit.provider:OrderEditController
	 * @description
	 * Provider of the {@link sampleOnlineStoreApporder.list.edit.controller:OrderEditController OrderEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} OrderService The OrderService to use
	 * @param {Resource} order The order data to use
	 */

	OrderEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'OrderService', 'order'];

	function OrderEditController($state, $stateParams, $mdDialog, Toast, OrderService, order) {
		var vm = this;

		// defaults
		vm.order = angular.copy(order, vm.order);
		vm.displayName = order.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current order
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.order._id});
		}

		/**
		 * Open the order list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a order by using the OrderService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.order._id || form && !form.$valid) {
				return;
			}

			OrderService.update(vm.order)
				.then(updateOrderSuccess)
				.catch(updateOrderCatch);

			function updateOrderSuccess(updatedOrder) {
				// update the display name after successful save
				vm.displayName = updatedOrder.name;
				Toast.show({text: 'Order ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateOrderCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating Order ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the order if she wants to delete the current selected order.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete order ' + vm.displayName + '?')
				.content('Do you really want to delete order ' + vm.displayName + '?')
				.ariaLabel('Delete order')
				.ok('Delete order')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a order by using the OrderService remove method
			 * @api private
			 */
			function performRemove() {
				OrderService.remove(vm.order)
					.then(deleteOrderSuccess)
					.catch(deleteOrderCatch);

				function deleteOrderSuccess() {
					Toast.show({type: 'success', text: 'Order ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteOrderCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting order ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}
	}
})();
