const config = require('../config.json');
//const jp = require('nihongo');

module.exports = message => {
	let client = message.client;
	console.log('------------------INIT START------------------');
	/*if (jp.isJapanese(message.content))
		console.log(`DEBUG: jp = '${message.content}'`);*/
	
	// Secret keywords
	console.log(`DEBUG: message.content = ${message.content}`);
	// Aqours
	let reg = new RegExp(/aquor(s?)(?![a-zA-Z])/,'ig');
	let aqours = reg.test(message.content);
	if (aqours)
		message.channel.send('Its spelled **Aqours**. https://gfycat.com/LankyAnchoredDobermanpinscher');
	if(message.content == 'you\'re bad kid')
		message.channel.send('AND YOU NEED TO SHUT THE FUCK UP');

	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;
	console.log(`DEBUG: prefix = '${config.prefix}'`);
	let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	console.log(`DEBUG: args = '${args}'`);
	let command = args.shift().toLowerCase().trim();
	console.log(`DEBUG: command = '${command}'`);
	let perms = client.elevation(message);

	for (let i = 0; i < args.length; i++)
		console.log(`DEBUG: args[${i}] = '${args[i]}'`);

	let cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		console.log(`DEBUG: command (alias) = '${client.aliases.get(command)}'`);
		cmd = client.commands.get(client.aliases.get(command));
	}
	if (cmd) {
		if (perms < cmd.conf.permLevel) return;
		cmd.run(client, message, args, perms);
	}

	/*try {
		//await message.delete(1000); // delete command message
		let cmdFile = require(`../commands/${command}`);
		cmdFile.run(client, message, args);
	} catch (e) {
		message.channel.send(`**"${command}"** is not a valid command.`);
		console.log(`Command "${command}" failed\n${e.stack}.`);
	}*/
	console.log('------------------INIT END------------------');
};