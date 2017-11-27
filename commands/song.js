const Discord = require('discord.js');
const play = require('./play');

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
			console.log('DEBUG: [song.js] trackNum = ' + trackNum+1);
			//console.log('DEBUG: [song.js] playlist = ' + playlist);

			// remove track numbers and extensions
			let songNames = [];
			for (let i = 0; i < playlist.length; i++) {
				songNames[i] = playlist[i].substr(0, playlist[i].lastIndexOf('.')); // remove extension
				songNames[i] = songNames[i].replace(/^[()]*[0-9]*[ ()_.-]*/, ''); // remove track numbers
			}

			//name.replaceFirst("^\\d+\\.?\\s*-(?:.*?-)?\\s*", "")

			let embed = new Discord.RichEmbed()
				.setColor(0xFB95CD)
				.setTitle('Song Info:')
				//.setURL(`${linkURL}`)
				.setThumbnail('https://i.imgur.com/OctOicW.png')
				.addField('Name', songNames[trackNum])
				.addField('Track', trackNum+1)
				.addField('Duration', 'Didn\'t implement this yet.')
				.setTimestamp();
				//.setFooter('http://www.google.com');
			message.channel.send(embed);
		}
	} catch (e) {
		console.error(e);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['sg'],
	permLevel: 0
};

exports.help = {
	name: 'song',
	description: 'Info on the current song',
	usage: 'song [command]'
};