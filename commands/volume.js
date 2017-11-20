const config = require('../config.json');

exports.run = (client, message, args) => {

	//console.log(typeof(message.guild.voiceConnection.dispatcher));
	if (message.guild.voiceConnection !== null) {
		let dispatcher = message.guild.voiceConnection.dispatcher;
		let inputVolume = Math.round(args.slice(0).join(' '));
		console.log(`DEBUG: inputVolume = ${inputVolume}`);
		if (inputVolume > 100 || inputVolume <= 0) {
			console.log(`DEBUG: inputVolume = ${inputVolume}`);
			message.channel.send(`Invalid volume level.
	\`Syntax: ${config.prefix}(volume {integer} [Between 1-100]\``);
		} else {
			message.channel.send(`Volume set at: **${inputVolume}%**`).then(() => {
				dispatcher.setVolume(`${inputVolume/100}`);
			});
			console.log(`Volume set at: ${inputVolume}%`);
		}
	} else {
		message.channel.send('I\'m not in a music channel yet m8.');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['v','vol'],
	permLevel: 3
};

exports.help = {
	name: 'volume',
	description: 'Set volume level',
	usage: 'volume [command][integer 1-100]'
};