exports.run = function(client, message, args) {

	let messageCount = parseInt(args.slice(0).join(' '), 10);
	if (messageCount >= 2 && messageCount <= 100) {
		console.log(`DEBUG: messageCount = "${messageCount}"`);
		message.channel.fetchMessages({limit: messageCount})
    .then(messages => message.channel.bulkDelete(messages));
		message.channel.send(`Deleted **${messageCount}** messages.`);
	} else {
		message.channel.send('**Error:** You must provide a number between 2 - 100.');
		console.log('DEBUG: messageCount must be between 2 - 100.');
	}

};
