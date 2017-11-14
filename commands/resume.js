exports.run = function(client, message) {

	const dispatcher = message.guild.voiceConnection.playFile();
	message.channel.send('Resumed.').then(() => {
		dispatcher.resume();
	});
	console.log('DEBUG: Resumed');
};
