const config = require('../config.json');

exports.run = (client, message, args) => {
	
	if (!args[0]) {
		const commandNames = Array.from(client.commands.keys());
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
		message.channel.send('```SA10 Bot by 「永遠夏」 \n[Use ' + 
			config.prefix + 'help <command> for details]\n' + 
			client.commands.map(c => config.prefix + c.help.name + ' '.repeat(longest - c.help.name.length) 
			+ '\t\t' + c.help.description).join('\n') + '```');
	} else {
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`);
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h'],
	permLevel: 0
};

exports.help = {
	name: 'help',
	description: 'Displays this message',
	usage: 'help [command]'
};