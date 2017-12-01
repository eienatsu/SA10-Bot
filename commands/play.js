const fs = require('async-file');
const config = require('../config.json');

exports.run = async (client, message, args) => {
	const voiceChannel = message.member.voiceChannel;
	let trackNum = 0;
	let inputPlaylist = args.slice(0).join(' ');
	console.log(`DEBUG: [play.js] config.repeatPlaylist = ${config.repeatPlaylist}`);
	console.log(`DEBUG: [play.js] inputPlaylist = ${inputPlaylist}`);

	const getPlaylist = async () => {
		let playlist = [];
		try {
			playlist = await fs.readdir(`./music/${inputPlaylist}`);
			console.log('DEBUG: [play.js] playlist.length = ' + playlist.length);
			//console.log(playlist);
			return playlist;
		} catch (e) {
			console.error(`DEBUG: [play.js] readdir() failed = ${e}`);
		}
	};

	const getDirs = async () => {
		let dirs = [];
		try {
			dirs = await fs.readdir('./music/');
			//console.log('DEBUG: dirs.length = ' + dirs.length);
			console.log(dirs);
			return dirs;
		} catch (e) {
			console.error(`DEBUG: [play.js] readdir() failed = ${e}`);
		}
	};

	const formatSongNames = (playlist) => {
		// remove track numbers and extensions
		let songNames = [];
		for (let i = 0; i < playlist.length; i++) {
			songNames[i] = playlist[i].substr(0, playlist[i].lastIndexOf('.')); // remove extension
			songNames[i] = songNames[i].replace(/^[()]*[0-9]*[ ()_.-]*/, ''); // remove track numbers
		}
		return songNames;
	};

	const play = async (connection, playlist, trackNum, songNames) => {
		try {
			let dispatcher = connection;
			if (trackNum == playlist.length && config.repeatPlaylist == 'true')
				trackNum = 0; // repeat when at the end of the playlist
			if (playlist[trackNum] == undefined || playlist[trackNum] == null) {
				console.log('DEBUG: [play.js] End of playlist');
				voiceChannel.leave();
				return message.channel.send('End of playlist');
			}

			if (message.guild.voiceConnection == null) {
				console.log('DEBUG: [play.js] Voice connection disconnected');
				return;
			} else {
				dispatcher = connection.playFile(`./music/${inputPlaylist}/${playlist[trackNum]}`);
				dispatcher.passes = 2;
				//console.log(`DEBUG: Current track ${trackNum+1} = ${songNames[trackNum]}`);
				//message.channel.send(`Now playing [ Track ${trackNum+1} ]: **${songNames[trackNum]}**`);
			}

			//console.log('DEBUG: [play.js] client message listener = ' + client.listenerCount('message'));
			let collector = message.channel.createMessageCollector(m => m);
			collector.on('collect', async m => {
				console.log('------------------play.js collector START------------------');
				if (m.author.bot) return;
				if (!m.content.startsWith(config.prefix)) return;
				if (m.content.startsWith(config.prefix + 'pick')) {
					const args = m.content.slice(config.prefix.length).trim().split(/ +/g);
					console.log('DEBUG: [play.js] args = ' + args);
					const inputTrackNum = m.content.split(' ').slice(1, 2)[0];
					console.log('DEBUG: [play.js] inputTrackNum = ' + inputTrackNum);

					if (inputTrackNum < 1 || inputTrackNum > playlist.length) {
						message.channel.send('ERROR: Invalid Song ID. Use \`playlist\` command.');
						console.log('DEBUG: [play.js] Invalid Song ID.');
					} else {
						trackNum = inputTrackNum-2;
						dispatcher.end();
					}
				} else if (m.content.startsWith(config.prefix + 'prev')) {	
					trackNum -= 2;
					dispatcher.end();
				}
			});

			dispatcher.on('end', () => {
				//playlist.shift();
				collector.stop();
				trackNum += 1;
				play(connection, playlist, trackNum, songNames);
			});
					
			dispatcher.on('error', e => {
				console.log(`DEBUG: [play.js] dispatcher error = ${e}`);
				return;
			});

			exports.song = {
				inputPlaylist: inputPlaylist,
				trackNum: trackNum,
				playlist: playlist
			};
		} catch (e) {
			console.error(`DEBUG: [play.js] play() error = ${e}`);
			return;
		}
	};

	// START
	try {
		const dirs = await getDirs();
		if (!inputPlaylist) {//if no args were provided
			message.channel.send('ERROR: Playlist name not provided');
			return;
		} else if (!(dirs.indexOf(inputPlaylist) > -1)) {
			message.channel.send('ERROR: Playlist doesn\'t exist');
			return;
		}
	} catch (e) {
		console.error('DEBUG: [play.js] playlist doesn\'t exist error = ' + e);
		return;
	}
	
	let connection;
	try {
		if (!voiceChannel || voiceChannel.type !== 'voice') {
			return message.channel.send('ERROR: Not in a voice channel.');
		} else if (message.guild.voiceConnection) {
			return message.channel.send('ERROR: Already playing.');
		} else {
			message.channel.send('Loading playlist...');
			connection = await voiceChannel.join();
			message.channel.send(`Connected to voice channel "${voiceChannel.name}"`);
		}
	} catch (e) {
		console.error('DEBUG: [play.js] voice connection error = ' + e);
	}

	const playlist = await getPlaylist();
	const songNames = formatSongNames(playlist);
	play(connection, playlist, trackNum, songNames);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['p'],
	permLevel: 0
};

exports.help = {
	name: 'play',
	description: 'Start selected music playlist',
	usage: 'play [playlistName]'
};