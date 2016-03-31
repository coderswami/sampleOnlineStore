/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';


/*
// Insert some data needed to bootstrap or init the application

if ('production' === env) {
	// Insert some data needed to init the production instance only, update a version info ...
}
*/

/*
 * Insert dummy data to test the application
 */

if ('development' === env) {
	console.log('Populating test and development data ...');

}
