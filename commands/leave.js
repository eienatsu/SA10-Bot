exports.run = function(client, message) {

	let voiceCh = message.member.voiceChannel;
	if (!voiceCh) {
		message.channel.send('You\'re not in a voice channel.');
	} else {
		message.channel.send('Leaving voice channel...').then(() => {
			voiceCh.leave();
		}).catch(error => message.channel.send(error));
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['l'],
	permLevel: 0
};

exports.help = {
	name: 'leave',
	description: 'Get SA10 Bot to leave the voice channel',
	usage: 'leave [command]'
};