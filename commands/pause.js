exports.run = function(client, message) {

	const dispatcher = message.guild.voiceConnection.playFile();
	message.channel.send('Paused.').then(() => {
		dispatcher.pause();
	});
	console.log('DEBUG: Paused');
};
