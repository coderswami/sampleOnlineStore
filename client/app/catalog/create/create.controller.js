/**
 * @ngdoc controller
 * @name sampleOnlineStoreApp.catalog.create.controller:CatalogCreateController
 * @description
 * Controller of the catalog create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as CatalogCreateController
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.create')
		.controller('CatalogCreateController', CatalogCreateController);

	/**
	 * @ngdoc function
	 * @name sampleOnlineStoreApp.catalog.create.provider:CatalogCreateController
	 * @description
	 * Provider of the {@link sampleOnlineStoreApp.catalog.create.controller:CatalogCreateController CatalogCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Catalog The Catalog resource
	 * @param {Service} CatalogService The Catalog service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link sampleOnlineStoreApp.catalog.create.controller:CatalogCreateController CatalogCreateController}
	 */

	CatalogCreateController.$inject = ['$mdDialog', 'Catalog', 'CatalogService', 'Toast'];

	function CatalogCreateController($mdDialog, Catalog, CatalogService, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name catalog
		 * @propertyOf sampleOnlineStoreApp.catalog.create.controller:CatalogCreateController
		 * @description
		 * The new catalog data
		 *
		 * @returns {Object} The catalog data
		 */
		vm.catalog = new Catalog();

		// view model bindings (documented below)
		vm.create = createCatalog;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name createCatalog
		 * @methodOf sampleOnlineStoreApp.catalog.create.controller:CatalogCreateController
		 * @description
		 * Create a new catalog by using the CatalogService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createCatalog(form) {
			// refuse to work with invalid data
			if (vm.catalog._id || (form && !form.$valid)) {
				return;
			}

			CatalogService.create(vm.catalog)
				.then(createCatalogSuccess)
				.catch(createCatalogCatch);

			function createCatalogSuccess(newCatalog) {
				Toast.show({
					type: 'success',
					text: 'Catalog ' + newCatalog.name + ' has been created',
					link: {state: 'catalog.list.detail', params: {id: newCatalog._id}}
				});
				vm.close();
			}

			function createCatalogCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new Catalog'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf sampleOnlineStoreApp.catalog.create.controller:CatalogCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf sampleOnlineStoreApp.catalog.create.controller:CatalogCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
