const config = require('../config.json');
const fs = require('fs');

exports.run = (client, message) => {

	let newPrefix = message.content.split(' ').slice(1, 2)[0];
	if (newPrefix.length === 0 || !newPrefix) {
		message.channel.send('No arguement specified.');
	}
	else if (newPrefix.length > 1) {
		message.channel.send('Specified prefix is longer than 1 character.');
	} else {
		config.prefix = newPrefix;
		fs.writeFile('./config.json', JSON.stringify(config, null, '\t'), (err) => {
			if (err) throw err;
			console.log(`DEBUG: newPrefix = "${newPrefix}"`);
			message.channel.send(`The new prefix has been set to "${newPrefix}".`);
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['prefix'],
	permLevel: 3
};

exports.help = {
	name: 'prefix',
	description: 'Set new prefix',
	usage: '[prefix] [newPrefix]'
};