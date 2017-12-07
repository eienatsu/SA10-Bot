const Discord = require('discord.js');
const play = require('./play');
const jsmediatags = require('jsmediatags');

exports.run = (client, message) => {
	const voiceChannel = message.member.voiceChannel;
	try {
		if (!voiceChannel) {
			message.channel.send('Not in the voice channel.');
		} else if (!message.guild.voiceConnection) {
			message.channel.send('Nothing playing.');
		} else {
			const trackNum = play.song.trackNum;
			const playlist = play.song.playlist;
			console.log('DEBUG: [song.js] trackNum = ' + (trackNum+1));
			//console.log('DEBUG: [song.js] playlist = ' + playlist);

			// remove track numbers and extensions
			let songNames = [];
			for (let i = 0; i < playlist.length; i++) {
				songNames[i] = playlist[i].substr(0, playlist[i].lastIndexOf('.')); // remove extension
				songNames[i] = songNames[i].replace(/^[()]*[0-9]*[ ()_.-]*/, ''); // remove track numbers
			}

			const songDir = play.song.songDir;
			
			console.log(`DEBUG: [song.js] songDir = '${songDir}'`);

			jsmediatags.read(songDir, {
				onSuccess: (tag) => {
					console.log(`DEBUG: [song.js] tags.read() = ${tag}`);
					console.log(`DEBUG: [song.js] tags.artist = ${tag.tags.artist}`);
					console.log(`DEBUG: [song.js] tags.album = ${tag.tags.album}`);
					console.log(`DEBUG: [song.js] tags.track = ${tag.tags.track}`);
					//console.log(`DEBUG: [song.js] tags.picture = ${JSON.stringify(tag.tags.picture)}`);

					let embed = new Discord.RichEmbed()
					.setColor(0xFB95CD)
					.setTitle('Song Info:')
					//.setURL(`${linkURL}`)
					.setThumbnail(tag.tags.picture)
					//.setThumbnail('https://i.imgur.com/OctOicW.png')
					.addField('Name', songNames[trackNum])
					.addField('Track', trackNum+1)
					.addField('Duration', 'Didn\'t implement this yet.')
					.setTimestamp();
					message.channel.send(embed);
				},
				onError: error => {
					console.log(':(', error.type, error.info);
				}
			});		
		}
	} catch (e) {
		console.error(e);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['sg','info'],
	permLevel: 0
};

exports.help = {
	name: 'song',
	description: 'Show info on current song',
	usage: '[song]'
};