const fs = require('async-file');

exports.run = (client, message) => {
	const listOfdirs = async () => {
		let dirs = [];
		try {
			dirs = await fs.readdir('./music/');
			console.log('DEBUG: [list.js] dirs.length = ' + dirs.length);
			console.log(dirs);

			// create list of playlists string
			let dirsString = `\`\`\`List of Playlists\n${'-'.repeat(18)}\n`;
			for (let i = 0; i <= dirs.length - 1; i++) {
				dirsString += dirs[i];
				if (i == dirs.length - 1)
					dirsString += '';
				else
					dirsString += '\n';
			}
			dirsString += '\`\`\`';
			console.log(`${dirsString}`);
			message.channel.send(dirsString);
		} catch (e) {
			console.error(`DEBUG: [list.js] readdir() failed = ${e}`);
		}
	};
	listOfdirs();	
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['l'],
	permLevel: 0
};

exports.help = {
	name: 'list',
	description: 'Show list of playlist',
	usage: 'dirs [command][string]'
};

