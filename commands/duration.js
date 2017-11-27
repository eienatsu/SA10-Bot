exports.run = function(client, message) {
	let dispatcher = message.guild.voiceConnection.dispatcher;
	message.channel.send(`Total play time : ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000):Math.floor((dispatcher.time % 60000)/1000)}`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['dur'],
	permLevel: 0
};

exports.help = {
	name: 'duration',
	description: 'Displays total play time when SA10 is playing music',
	usage: 'duration [command]'
};