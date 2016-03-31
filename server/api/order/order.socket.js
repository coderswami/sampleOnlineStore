/**
 * Module for registering broadcast updates to clients when
 * the Order model changes. Exports the
 * [register function]{@link order:socket~registerOrderSockets}
 * to register the model schema events on the socket instance.
 * @module {function} order:socket
 * @requires {@link order:model}
 */
'use strict';

/**
 * The Order model instance
 * @type {order:model~Order}
 */
var Order = require('./order.model').model;

// export the function to register all socket broadcasts
exports.register = registerOrderSockets;

/**
 * Register Order model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Order model events on
 */
function registerOrderSockets(socket) {
	Order.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Order.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Order save event on a socket object: 'order:save'
 * @param {socket.io} socket - The socket object to emit the Order save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('order:save', doc);
}

/**
 * Emit a Order remove event on a socket object: 'order:remove'
 * @param {socket.io} socket - The socket object to emit the Order remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('order:remove', doc);
}
