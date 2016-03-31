/**
 * An module for defining and initializing the Order model.
 * Exporting the Order model definition, schema and model instance.
 * @module {Object} order:model
 * @property {Object} definition - The [definition object]{@link order:model~OrderDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link order:model~OrderSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link order:model~Order}
 */
'use strict';

var mongoose = require('mongoose');

/**
 * The Order model definition
 * @type {Object}
 * @property {String} name - The name of this order
 * @property {String} info - Details about this order
 * @property {Boolean} active - Flag indicating this order is active
 */
var OrderDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean
};

/**
 * The Order model schema
 * @type {MongooseSchema}
 */
var OrderSchema = new mongoose.Schema(OrderDefinition);

/**
 * Validations
 */
OrderSchema
	.path('name')
	.validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Order model
 *  @type {Order}
 */
var Order = mongoose.model('Order', OrderSchema);

module.exports = {

	/**
	 * The Order model definition object
	 * @type {Object}
	 * @see order:OrderModel~OrderDefinition
	 */
	definition: OrderDefinition,

	/**
	 * The Order model schema
	 * @type {MongooseSchema}
	 * @see order:model~OrderSchema
	 */
	schema: OrderSchema,

	/**
	 * The Order model instance
	 * @type {order:model~Order}
	 */
	model: Order

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
	this.constructor.findOne({name: value}, function (err, order) {
		if (err) {
			throw err;
		}

		if (order) {
			// the searched name is my name or a duplicate
			return respond(self.id === order.id);
		}

		respond(true);
	});
}
