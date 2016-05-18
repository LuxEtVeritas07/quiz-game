'use strict';

// ----- Requires ----- //

let expect = require('chai').expect;
let io = require('socket.io-client');


// ----- Setup ----- //

const options = {
	transports: ['websocket'],
	'force new connection': true
};

const PORT = 3000;


// ----- Tests ----- //

describe('Socket', function () {

	beforeEach(function (done) {

		require('../index');
		done();

	});

	it('accepts a connection', function (done) {

		let client = io.connect(`http://localhost:${PORT}`, options);

		client.once('connect', () => {

			client.disconnect();
			done();

		});

	});

	describe('Type Events', function () {

		it("handles a 'type' event for correct user", function (done) {

			let client = io.connect(`http://localhost:${PORT}`, options);

			client.once('err', (msg) => {

				client.disconnect();
				done(Error(msg));

			});

			client.once('client-accepted', () => {

				client.once('client-accepted', () => {

					client.once('client-accepted', () => {

						client.disconnect();
						done();

					});

				});				

			});

			client.once('connect', () => {

				client.emit('type', 'host');
				client.emit('type', 'player');
				client.emit('type', 'screen');

			});

		});

		it("handles a 'type' event for an invalid user", function (done) {

			let client = io.connect(`http://localhost:${PORT}`, options);

			client.once('err', (msg) => {

				client.disconnect();
				done();

			});

			client.once('client-accepted', () => {

				client.disconnect();
				done(Error('The user is invalid, should not be accepted.'));

			});

			client.once('connect', () => {
				client.emit('type', 'invalid');
			});

		});

		it('handles duplicate hosts', function (done) {

			let client = io.connect(`http://localhost:${PORT}`, options);

			client.once('err', (msg) => {

				client.disconnect();
				done(Error(msg));

			});

			client.once('client-accepted', () => {

				client.disconnect();
				done(Error('Two hosts not allowed.'));

			});

			client.once('host-exists', () => {

				client.disconnect();
				done();

			});

			client.once('connect', () => {

				client.emit('type', 'host');
				client.emit('type', 'host');

			});

		});

	});

});
