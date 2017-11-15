exports.run = async (client, message, args) => {

	let messageCount = parseInt(args.slice(0).join(' '), 10);
	console.log(`DEBUG: messageCount = "${messageCount}"`);
	if (messageCount >= 2 && messageCount <= 100) {
		message.channel.fetchMessages({limit: messageCount})
    .then(messages => message.channel.bulkDelete(messages));
		message.channel.send(`Deleted **${messageCount}** messages.`)
			.then(message => {
				message.delete(1000);
				console.log(`Deleted message from ${message.author.tag}`);
			})
			.catch(console.error);
	} else {
		message.channel.send('**Error:** You must provide a number between 2 - 100.')
		.then(message => {
			message.delete(1000);
			console.log(`Deleted message from ${message.author.tag}`);
		});
	}

};
