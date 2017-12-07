exports.run = async (client, message, args) => {

	let messageCount = parseInt(args.slice(0).join(' '), 10);
	//messageCount += 1;
	console.log(`DEBUG: [purge.js] messageCount = "${messageCount}"`);
	try {
		if (messageCount >= 2 && messageCount <= 100) {
			const getMsgs = await message.channel.fetchMessages({limit:messageCount, before:message.id});
			message.channel.bulkDelete(getMsgs);
			console.log(`DEBUG: [purge.js] = Deleted ${messageCount} message(s)`);
		} else {
			message.channel.send('ERROR: You must provide a number between 2 - 100.');
		}
	} catch (e) {
		console.error(`ERROR: [purge.js] = ${e}`);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['d'],
	permLevel: 3
};

exports.help = {
	name: 'purge',
	description: 'Mass deletes messages',
	usage: '[purge] [integer 2-100]'
};