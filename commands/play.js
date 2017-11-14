const config = require('../config.json');

exports.run = function(client, message, args) {

	const music = async (message, inputSongName) => {
		console.log(`DEBUG: inputSongName = ${inputSongName}`);
		const dispatcher = message.guild.voiceConnection.playFile(`./music/${inputSongName}.mp3`);
		dispatcher.setVolume(1);
		message.channel.send(`Now playing: **"${inputSongName}"** requested by ${message.member.user}.`);
		client.user.setGame(`${inputSongName}`);

		dispatcher.on('end', () => {
			message.channel.send('音楽の終わり').then(() => {
				dispatcher.end();
			});
		});
		dispatcher.on('error', e => {
			console.log(`DEBUG: dispatcher.on('error') = ${e}`);
		});
	};

	// dispatcher is an instance of a StreamDispatcher
	// stream to voice channel
	let inputSongName = args.slice(0).join(' '); // isolate the argument (song name)
	if (!inputSongName) { //if no args were input
		message.channel.send(`You didn't include the song name.
\`Syntax: ${config.prefix}play songName\``);
	} else { // else play dank tunes
		music(message, inputSongName);
		console.log(`DEBUG: play = ${inputSongName}`);
		//message.channel.send(embed);
	}
};
