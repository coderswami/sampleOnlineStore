'use strict';

describe('Controller: CatalogItemsController', function () {

	// load the controller's module
	beforeEach(module('sampleOnlineStoreApp.catalog.items'));

	var controller;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('CatalogItemsController', {
			// $scope: scope
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

});
