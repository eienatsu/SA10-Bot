const main = require('../bot.js');
exports.run = function(client, message, args) {
	let cmd = args.join(' ');
	main.reload(message, cmd);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 3
};

exports.help = {
	name: 'reload',
	description: 'Reloads a command',
	usage: 'reload [command]'
};