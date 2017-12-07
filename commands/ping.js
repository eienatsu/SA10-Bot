exports.run = async (client, message) => {

	let min = Math.ceil(0);
	let max = Math.floor(1000);
	const randomNum = Math.floor(Math.random() * ((max - min)) + min);
	console.log('DEBUG [ping.js] random number = ' + randomNum);
	
	let pingString = '';
	if (randomNum > 800)
		pingString = 'You will not get itemz. xD';
		
	const sendPing = () => {
		message.channel.send('`Average Ping: ' + randomNum + ' ms`');
		if (randomNum <= 50)
			message.channel.send('You\'re the BEST https://i.imgur.com/Z6U7ea2.jpg');
	};

	message.channel.send('`Pinging www.nexon.net [208.85.110.136] with 32 bytes of data...`');
	setTimeout(sendPing, 1000);
	
	
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'ping',
	description: 'Ping nexon servers? :thinking:',
	usage: 'ping [command]'
};