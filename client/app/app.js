/**
 * @ngdoc overview
 * @name sampleOnlineStoreApp
 * @description
 * Module definition for the sampleOnlineStoreApp module.
 */

(function () {
	'use strict';

	angular
		.module('sampleOnlineStoreApp', [
			// Add modules below
			'sampleOnlineStoreApp.order',
			'sampleOnlineStoreApp.catalog',
			'ngCookies',
			'ngResource',
			'ngSanitize',
			'ngMessages',
			'ngMaterial',
			'ui.router',
			'sampleOnlineStoreApp.toast',
			'sampleOnlineStoreApp.auth.user',
			'sampleOnlineStoreApp.listImage',
			'sampleOnlineStoreApp.lodash',
			'sampleOnlineStoreApp.mainMenu',
			'sampleOnlineStoreApp.main'
		])
		.config(appConfig);

	/* App configuration */

	// add appConfig dependencies to inject
	appConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider'];

	/**
	 * Application config function
	 *
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 * @param $locationProvider
	 */
	function appConfig($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
		$urlRouterProvider.otherwise('/');
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);

		// set the default palette name
		var defaultPalette = 'webstore-pallete';

		var primaryPalette = {
			'default': '500',
			'hue-1': '200',
			'hue-2': '600',
			'hue-3': 'A100'
		};

		var accentPalette = {
			'default': '400',
			'hue-1': '100',
			'hue-2': '600',
			'hue-3': 'A200'
		};

		var warningPalette = {
			'default': '400',
			'hue-1': '100',
			'hue-2': '600',
			'hue-3': 'A100'
		};

		var backgroundPalette = {
			'50': 'ffebee',
			'100': 'ffcdd2',
			'200': 'ef9a9a',
			'300': 'e57373',
			'400': 'ef5350',
			'500': 'ffffff',
			'600': 'e53935',
			'700': 'd32f2f',
			'800': 'c62828',
			'900': 'b71c1c',
			'A100': 'fafafa',
			'A200': 'ff5252',
			'A400': 'ff1744',
			'A700': 'd50000',
			'contrastDefaultColor': 'light',
			'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
			'contrastLightColors': undefined
		};

		// define a palette to darken the background of components
		$mdThemingProvider.definePalette('backgroundPalette', backgroundPalette);

		//$mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
		$mdThemingProvider.setDefaultTheme(defaultPalette);

		// customize the theme
		$mdThemingProvider
			.theme(defaultPalette)
			.primaryPalette('cyan',primaryPalette)
			.accentPalette('pink',accentPalette)
			.warnPalette('red',warningPalette)
			.backgroundPalette('backgroundPalette');

		var spritePath = 'bower_components/material-design-icons/sprites/svg-sprite/';
		$mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');
		$mdIconProvider.iconSet('action', spritePath + 'svg-sprite-action.svg');
		$mdIconProvider.iconSet('content', spritePath + 'svg-sprite-content.svg');
		$mdIconProvider.iconSet('toggle', spritePath + 'svg-sprite-toggle.svg');
		$mdIconProvider.iconSet('alert', spritePath + 'svg-sprite-alert.svg');
	};

})();
