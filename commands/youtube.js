const auth = require('../auth.json');
const request = require('request');
const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

exports.run = async (client, message, args) => {

	let ytUser = args.slice(0).join(' ');
	console.log(`DEBUG: ytUser = "${ytUser}"`);
	request.get({
		uri: `https://www.googleapis.com/youtube/v3/channels/?
				forUsername=${ytUser}&
				part=snippet,statistics&
				key=${auth.google_api}`,
		json: true
	}, (err, res, body) => {
		if (err) return console.log(err);
		let channelID = body.items[0].id;
		let viewCount = parseInt(body.items[0].statistics.viewCount).toLocaleString();
		let subCount = body.items[0].statistics.subscriberCount;
		let cmt = body.items[0].statistics.commentCount;
		let ytImage = body.items[0].snippet.thumbnails.high.url;
		let videoCount = body.items[0].statistics.videoCount;
		let desc = body.items[0].snippet.description;

		embed
			.setColor(0xFF0000)
			.setTitle(`YouTube channel: **${ytUser}**`)
			.setAuthor(`${ytUser}`, `${ytImage}`)
			.setDescription(`${desc}`)
			.setThumbnail(`${ytImage}`)
			.setURL(`http://www.youtube.com/user/${ytUser}`)
			.addField('Views:', `${viewCount}`)
			.addField('Subscribers:', `${subCount}`)
			.addField('Public Videos:', `${videoCount}`)
			.addField('Channel Comments:', `${cmt}`)
			.setTimestamp()
			.setFooter(`Channel ID: ${channelID}`);
		message.channel.send({embed});
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['yt'],
	permLevel: 0
};

exports.help = {
	name: 'youtube',
	description: 'Get YouTube channel data',
	usage: 'youtube [command][string : channel name/id]'
};