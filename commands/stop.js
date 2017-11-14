exports.run = function(client, message) {

	const dispatcher = message.guild.voiceConnection.playFile();
	message.channel.send('Stopped.').then(() => {
		dispatcher.end();
	});
	console.log('DEBUG: Stopped.');
};
