const config = require('../config.json');

exports.run = function(client, message, args) {

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
};
