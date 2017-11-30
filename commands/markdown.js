const config = require('../config.json');

exports.run = (client, message) => {
	
	message.channel.send(`https://i.imgur.com/YASXEhr.png
<https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline->`);

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['md'],
	permLevel: 0
};

exports.help = {
	name: 'markdown',
	description: 'Displays Discord markdown syntax',
	usage: '[markdown]'
};