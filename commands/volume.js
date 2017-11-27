exports.run = async (client, message, args) => {
	const voiceChannel = message.member.voiceChannel;
	try {
		if (!voiceChannel) {
			message.channel.send('Not in the voice channel.');
		} else if (!message.guild.voiceConnection) {
			message.channel.send('Nothing playing.');
		} else {
			//exports.status = {isPlaying: isPlaying};
			//console.log('DEBUG: stop.isPlaying = ' + isPlaying);
			const dispatcher = message.guild.voiceConnection.dispatcher;
			let inputVolume = Math.round(args.slice(0).join(' '));
			console.log(`DEBUG: inputVolume = ${inputVolume}`);
			if (inputVolume > 100 || inputVolume <= 0) {
				message.channel.send('Invalid volume level.');
			} else {
				await dispatcher.setVolume(`${inputVolume/100}`);
				message.channel.send(`DEBUG: Volume set at: **${inputVolume}%**`);
			}
			console.log(`Volume set at: ${inputVolume}%`);
		}
	} catch (e) {
		console.error(e);
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