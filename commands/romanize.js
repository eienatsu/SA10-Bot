//const Discord = require('discord.js');
const jp = require('japanese');

exports.run = async (client, message, args) => {

	const inputJp = args.slice(0).join(' ');
	console.log(`DEBUG inputJP = ${inputJp}`);

	try {
		const romanizeInput = await jp.romanize(inputJp);
		console.log(`DEBUG romanizeInput = ${romanizeInput}`);
		message.channel.send(romanizeInput);
	} catch (e) {
		console.error(e);
	}
	//message.channel.send(parseKanji);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['rom'],
	permLevel: 0
};

exports.help = {
	name: 'romanize',
	description: 'Convert Japanese kana to romaji',
	usage: '[romanize]'
};