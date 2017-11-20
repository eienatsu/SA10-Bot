exports.run = function(client, message) {

	if (!message.guild) return; // if the message doesn't come from a guild, ignore it
	let voiceCh = message.member.voiceChannel;
	if (!voiceCh || voiceCh.type !== 'voice') {
		message.channel.send('You\'re not in a voice channel.')
				.catch(error => message.channel.send(error));
	} else if (message.guild.voiceConnection) {
		message.channel.send('Already connected to voice channel.');
	} else {
		message.channel.send('Connecting...')
				.then(() => {
					voiceCh.join()
						.then(() => {
							message.channel.send(`Connected to voice channel "${voiceCh.name}"`)
								.catch(error => message.channel.send(error));
						}).catch(error => message.channel.send(error));
				}).catch(error => message.channel.send(error));
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'join',
	description: 'Get SA10 Bot to join the voice channel',
	usage: 'join [command]'
};