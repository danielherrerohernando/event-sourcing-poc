const debug = require('debug')('service-book-api:books:commands:handlers:amend');
const initProjection = require('../../projection');
const { join } = require('path');
const eventFactories = require('require-all')(join(__dirname, '..', '..', 'events', 'factories'));

module.exports = ({ store, bus }) => {
	const project = initProjection(store);

	const execute = async command => {
		debug('Running handler for any "book amend" command...');
		const projection = await project(command);
		const { publication, payload } = eventFactories[command.operation](projection);
		await bus.publish(publication)(payload);
	};

	return { execute };
};
