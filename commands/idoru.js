const Discord = require('discord.js');

exports.run = (client, message) => {
	message.channel.send('https://gfycat.com/LankyAnchoredDobermanpinscher');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'idoru',
	description: 'Get info on an idoru',
	usage: '[idoru]'
};