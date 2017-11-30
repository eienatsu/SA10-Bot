const fs = require('async-file');
const play = require('./play');

exports.run = (client, message) => {
	const makePlaylistString = async () => {
		let playlist = [];

		const inputPlaylist = play.song.inputPlaylist;
		
		try {
			playlist = await fs.readdir(`./music/${inputPlaylist}`);
		} catch (e) {
			console.error(e);
		}

		// remove track numbers and extensions
		let songNames = [];
		for (let i = 0; i < playlist.length; i++) {
			songNames[i] = playlist[i].substr(0, playlist[i].lastIndexOf('.')); // remove extension
			songNames[i] = songNames[i].replace(/^[()]*[0-9]*[ ()_.-]*/, ''); // remove track numbers
		}
	
		// create divider based on the longest song name length 
		let longest = 0;
		for (let i = 0; i < songNames.length; i++) 
			if (songNames[i].length > longest)
				longest = songNames[i].length;
		console.log(`longest song name = ${longest}`);
		let divider = '-'.repeat(longest+6);

		// create playlist string
		let playlistString = `\`\`\`Playlist 「${inputPlaylist}」\nID\tSong\n${divider}\n`;
		for (let i = 0; i <= playlist.length - 1; i++) {
			if (i < 9)
				playlistString += '0' + (i+1) + '\t' + songNames[i];
			else
				playlistString += (i+1) + '\t' + songNames[i];
			if (i == playlist.length - 1)
				playlistString += '';
			else
				playlistString += '\n';
		}
		playlistString += '\`\`\`';
		console.log(`${playlistString}`);
		message.channel.send(playlistString);
		return playlistString;
	};
	// START
	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) {
		message.channel.send('Not in the voice channel.');
	} else if (!message.guild.voiceConnection) {
		message.channel.send('Nothing playing.');
	} else {
		makePlaylistString();
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['pl'],
	permLevel: 0
};

exports.help = {
	name: 'playlist',
	description: 'List all songs in current playlist',
	usage: '[playlist] [playlistName]'
};

