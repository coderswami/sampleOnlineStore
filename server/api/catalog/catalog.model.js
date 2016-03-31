/**
 * An module for defining and initializing the Catalog model.
 * Exporting the Catalog model definition, schema and model instance.
 * @module {Object} catalog:model
 * @property {Object} definition - The [definition object]{@link catalog:model~CatalogDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link catalog:model~CatalogSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link catalog:model~Catalog}
 */
'use strict';

var mongoose = require('mongoose');

/**
 * The Catalog model definition
 * @type {Object}
 * @property {String} name - The name of this catalog
 * @property {String} info - Details about this catalog
 * @property {Boolean} active - Flag indicating this catalog is active
 */
var CatalogDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean
};

/**
 * The Catalog model schema
 * @type {MongooseSchema}
 */
var CatalogSchema = new mongoose.Schema(CatalogDefinition);

/**
 * Validations
 */
CatalogSchema
	.path('name')
	.validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Catalog model
 *  @type {Catalog}
 */
var Catalog = mongoose.model('Catalog', CatalogSchema);

module.exports = {

	/**
	 * The Catalog model definition object
	 * @type {Object}
	 * @see catalog:CatalogModel~CatalogDefinition
	 */
	definition: CatalogDefinition,

	/**
	 * The Catalog model schema
	 * @type {MongooseSchema}
	 * @see catalog:model~CatalogSchema
	 */
	schema: CatalogSchema,

	/**
	 * The Catalog model instance
	 * @type {catalog:model~Catalog}
	 */
	model: Catalog

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
	// jshint validthis: true
	var self = this;

	// check for uniqueness of user name
	this.constructor.findOne({name: value}, function (err, catalog) {
		if (err) {
			throw err;
		}

		if (catalog) {
			// the searched name is my name or a duplicate
			return respond(self.id === catalog.id);
		}

		respond(true);
	});
}
