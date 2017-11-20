//const search = require('animelyrics');

exports.run = function(client, message, args) {
	//message.channel.send(`Time is ${new Date}`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'lyrics',
	description: 'Get lyrics from animelyrics.com',
	usage: 'lyrics [command]'
};