const { join } = require('path');
const reducers = require('require-all')(join(__dirname, 'reducers'));
const debug = require('debug')('service-book-api:books:projection');

module.exports = store => async command => {
	debug(`Retrieving all commands for books and id ${command.id}`);
	const commands = await store.commands.retrieve('books', command.id);
	debug(`Generating projection for books and id ${command.id}...`);
	return commands.reduce(reducers[command.operation], {});
};
