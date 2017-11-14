const config = require('../config.json');
const fs = require('fs');

exports.run = function(client, message) {

	let newPrefix = message.content.split(' ').slice(1, 2)[0];
	console.log(`${newPrefix.length}`);
	if (newPrefix.length >= 2) {
		message.channel.send(`Specified prefix is longer than 1 character. Length = ${newPrefix.length}. Try again. :joy:`);
	} else {
		config.prefix = newPrefix;
		fs.writeFile('./config.json', JSON.stringify(config), () => console.err);
		console.log(`DEBUG: newPrefix = "${newPrefix}"`);
		message.channel.send(`The new prefix has been set to "${newPrefix}".`);
	}
};
