const auth = require('../auth.json');
const request = require('request');

exports.run = function(client, message, args) {

	let ytUser = args.slice(0).join(' ');
	console.log(`DEBUG: ytUser = "${ytUser}"`);
	request.get({
		uri: `https://www.googleapis.com/youtube/v3/channels/?forUsername=${ytUser}&part=snippet,statistics&key=${auth.google_api}`,
		json: true
	}, (err, res, body) => {
		if (err) return console.log(err);
		var channelID = body.items[0].id;
		var viewCount = body.items[0].statistics.viewCount;
		var subCount = body.items[0].statistics.subscriberCount;
		var ytImage = body.items[0].snippet.thumbnails.high.url;
		var videoCount = body.items[0].statistics.videoCount;
		console.log(`YouTube channel "${ytUser}" | Subscribers: "${subCount}" | Total Video Views: "${viewCount}" | Total Public Videos: "${videoCount}" | Channel ID = "${channelID}"`);
		message.channel.send(`YouTube channel **${ytUser}** stats:
Subscribers: **${subCount}**
Total Views: **${viewCount}**
Total Public Videos: **${videoCount}**
Thumbnail Image: ${ytImage}
\`Channel ID = ${channelID}\``);
	});
};
