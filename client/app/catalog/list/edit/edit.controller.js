/**
 * @ngdoc controller
 * @name sampleOnlineStoreAppcatalog.list.edit.controller:CatalogEditController
 * @description
 * Controller of the catalog edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as CatalogEditController
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.list.edit')
		.controller('CatalogEditController', CatalogEditController);

	/**
	 * @ngdoc function
	 * @name sampleOnlineStoreAppcatalog.list.edit.provider:CatalogEditController
	 * @description
	 * Provider of the {@link sampleOnlineStoreAppcatalog.list.edit.controller:CatalogEditController CatalogEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} CatalogService The CatalogService to use
	 * @param {Resource} catalog The catalog data to use
	 */

	CatalogEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'CatalogService', 'catalog'];

	function CatalogEditController($state, $stateParams, $mdDialog, Toast, CatalogService, catalog) {
		var vm = this;

		// defaults
		vm.catalog = angular.copy(catalog, vm.catalog);
		vm.displayName = catalog.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current catalog
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.catalog._id});
		}

		/**
		 * Open the catalog list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a catalog by using the CatalogService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.catalog._id || form && !form.$valid) {
				return;
			}

			CatalogService.update(vm.catalog)
				.then(updateCatalogSuccess)
				.catch(updateCatalogCatch);

			function updateCatalogSuccess(updatedCatalog) {
				// update the display name after successful save
				vm.displayName = updatedCatalog.name;
				Toast.show({text: 'Catalog ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateCatalogCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating Catalog ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the catalog if she wants to delete the current selected catalog.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete catalog ' + vm.displayName + '?')
				.content('Do you really want to delete catalog ' + vm.displayName + '?')
				.ariaLabel('Delete catalog')
				.ok('Delete catalog')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a catalog by using the CatalogService remove method
			 * @api private
			 */
			function performRemove() {
				CatalogService.remove(vm.catalog)
					.then(deleteCatalogSuccess)
					.catch(deleteCatalogCatch);

				function deleteCatalogSuccess() {
					Toast.show({type: 'success', text: 'Catalog ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteCatalogCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting catalog ' + vm.displayName,
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
