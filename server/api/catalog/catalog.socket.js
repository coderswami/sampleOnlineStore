/**
 * Module for registering broadcast updates to clients when
 * the Catalog model changes. Exports the
 * [register function]{@link catalog:socket~registerCatalogSockets}
 * to register the model schema events on the socket instance.
 * @module {function} catalog:socket
 * @requires {@link catalog:model}
 */
'use strict';

/**
 * The Catalog model instance
 * @type {catalog:model~Catalog}
 */
var Catalog = require('./catalog.model').model;

// export the function to register all socket broadcasts
exports.register = registerCatalogSockets;

/**
 * Register Catalog model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Catalog model events on
 */
function registerCatalogSockets(socket) {
	Catalog.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Catalog.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Catalog save event on a socket object: 'catalog:save'
 * @param {socket.io} socket - The socket object to emit the Catalog save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('catalog:save', doc);
}

/**
 * Emit a Catalog remove event on a socket object: 'catalog:remove'
 * @param {socket.io} socket - The socket object to emit the Catalog remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('catalog:remove', doc);
}
