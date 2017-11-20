exports.run = function(client, message) {

	//const dispatcher = message.guild.voiceConnection.playFile();
	let d =  message.guild.voiceConnection.dispatcher.time;
	let s = parseInt(d / 1000); // convert to seconds
	let m = parseInt(s / 60); // convert to minutes
	let h = parseInt(m / 60); // convert to hours
	message.channel.send(`Current total playing time: **${h}h:${m}m:${s}s**.`);
	console.log(`Total duration = ${d} milliseconds.`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['dur'],
	permLevel: 0
};

exports.help = {
	name: 'duration',
	description: 'Displays total play time when SA10 is playing music',
	usage: 'duration [command]'
};