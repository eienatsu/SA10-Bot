const config = require('../config.json');

// message event handler
module.exports = message => {
	const client = message.client;

	// if the message doesn't start with the prefix, ignore
	if (!message.content.startsWith(config.prefix)) return;
	console.log('-----------------------------------------------');
	console.log(`DEBUG: prefix = '${config.prefix}'`);

	// checks that the Bot only reads the message from the sender
	if (message.author.bot) return;

	// isolate the prefix and slice the command at the spaces and divide by commas
	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	console.log(`DEBUG: args = '${args}'`);

	// isolate the command by itself
	var command = args.shift().toLowerCase();
	console.log(`DEBUG: command = '${command}'`);

	// debug all slices
	for (var i = 0; i < args.length; i++)
		console.log(`DEBUG: args[${i}] = '${args[i]}'`);

	try {
		let cmdFile = require(`../commands/${command}`);
		cmdFile.run(client, message, args);
	} catch (err) {
		message.channel.send(`**"${command}"** is not a valid command.`);
		console.log(`Command "${command}" failed\n${err.stack}.`);
	}
};
