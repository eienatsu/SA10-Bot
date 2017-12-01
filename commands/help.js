const config = require('../config.json');

exports.run = (client, message, args) => {

	if (!args[0]) {
		message.channel.send(`\`\`\`SA10 Bot by 「永遠夏」
Current prefix='${config.prefix}'
General:
	help						Show this help message
	help [command]			  Show additional info on a command
	markdown				    Show Discord's markdown syntax
	sa10					    Show random quote from N.H.K.
Music:
	play [playlist]			 Start selected music playlist
	list						List playlists
	playlist					List all songs in current playlist
	song						Show info on current song
	pick [song_ID]			  Play song in current playlist by ID
	skip						Skip to next track in playlist
	prev						Go back to previous track in playlist
	pause					   Pause current song
	resume					  Resume paused song
	stop						Stop playing music
	duration					Show current song's play time
	volume [percent]			Change volume level for current song
	lyrics (*WIP*)			  Show lyrics for current song
	repeat (*WIP*)			  Toggle playlist repeat (default: on)
Utility
	twitch (*WIP*)			  Notify server when user stream starts
	google (*WIP*)              Get first google search result
	ytinfo [yt_username/id]	 Get user\'s YouTube channel info
	weather (*WIP*)			 ...or Onix can help me with this
Anime
	anime (*WIP*)			   Get MAL page of anime
	mal (*WIP*)                 Get MAL page of manga
	pokemon (*WIP*)			 Get stats on a Pokemon
	idoru (*WIP*)			   Hanayoshit.
日本語
	jisho [kanji/kotoba]		Translate kanji (漢字) and Japanese words (言葉)
	jp [kanji/sentence]		 Get meaning of all kanji (漢字) in a sentence
	romanize [kana]			 Convert Japanese kana to romaji
Misc
	???						 Secret commands without a prefix\`\`\``);
	} else {
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			message.channel.send(`\`\`\`[ ${command.help.name} ]
Description: ${command.help.description}
Usage: ${command.help.usage}
Aliases: ${command.conf.aliases}\`\`\``);
		}
	}


	/*if (!args[0]) {
		const commandNames = Array.from(client.commands.keys());
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
		message.channel.send('```SA10 Bot by 「永遠夏」 \n[Use ' + 
			config.prefix + 'help <command> for details]\n' + 
			client.commands.map(c => config.prefix + c.help.name + ' '.repeat(longest - c.help.name.length) 
			+ '\t\t' + c.help.description).join('\n') + '```');
	} else {
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`);
		}
	}*/
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h','canicome'],
	permLevel: 0
};

exports.help = {
	name: 'help',
	description: 'Show this help message',
	usage: '[help] [commandName]'
};