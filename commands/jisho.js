//import { stringify } from 'querystring';

const request = require('request');
const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

exports.run = async (client, message, args) => {

	let phrase = args.slice(0).join(' ');
	console.log(`DEBUG: phrase = "${phrase}"`);
	var url = 'http://jisho.org/api/v1/search/words?keyword=人';
	var encodeURL = encodeURI(url);
	console.log(`encodeURL = ${encodeURL}`);
	request.get({
		uri: encodeURL,
		json: true
	}, (err, res, body) => {
		if (err) return console.log(err);
		var kunReading = body.data[0].japanese[0].reading;

		console.log(`kunReading = ${kunReading}`);
		let stringifyKunReading= JSON.stringify(kunReading);
		console.log(`stringifyKunReading = ${stringifyKunReading}`);

		embed
			.setColor(0x53D941)
			.setTitle(`Jisho: **${phrase}**`)
			.setAuthor('Japanese-English dictionary bot by Eienatsu')
			.setDescription(`Kanji: 人`)
			.setThumbnail('https://i.imgur.com/0YgTMd3.gifv')
			.setURL(`http://jisho.org/api/v1/search/words?keyword=人`)
			.addField('Kun-reading:', `${kunReading}`)
			// .addField('Subscribers:', `${subCount}`)
			// .addField('Public Videos:', `${videoCount}`)
			// .addField('Channel Comments:', `${cmt}`)
			.setTimestamp()
			.setFooter('JSON ID: ${needtofuckingcallthisvariablelater}');
		message.channel.send({embed});
	});
};
