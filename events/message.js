const config = require('../config.json');
//const jp = require('nihongo');
module.exports = async message => {
	
	let client = message.client;
	/*if (jp.isJapanese(message.content))
		console.log(`DEBUG: jp = '${message.content}'`);*/
	
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;
	console.log('------------------message.js START------------------');
	//console.log(`DEBUG: [message.js] prefix = '${config.prefix}'`);
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	console.log(`DEBUG: [message.js] args = '${args}'`);
	const command = args.shift().toLowerCase().trim();
	console.log(`DEBUG: [message.js] command = '${command}'`);
	const perms = client.elevation(message);
	exports.comm = {
		comm: command
	};
	const reg = new RegExp(/aquor(s?)(?![a-zA-Z])/,'ig');
	const aqours = reg.test(message.content);
	if (aqours)
		message.channel.send('Its spelled **Aqours**. https://gfycat.com/LankyAnchoredDobermanpinscher');

	for (let i = 0; i < args.length; i++)
		console.log(`DEBUG: [message.js] args[${i}] = '${args[i]}'`);

	let cmd;
	message.delete(5000);
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		console.log(`DEBUG: [message.js] command (alias) = '${client.aliases.get(command)}'`);
		cmd = client.commands.get(client.aliases.get(command));
	}
	if (cmd) {
		if (perms < cmd.conf.permLevel) return;
		cmd.run(client, message, args);
	}
	console.log('------------------message.js END------------------');
};