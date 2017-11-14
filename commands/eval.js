const config = require('../config.json');

exports.run = function(client, message) {

	const clean = text => {
		if (typeof(text) === 'string')
			return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
		else
      return text;
	};

	if (message.author.id !== config.ownerID) return;
	try {
		console.log(`DEBUG: message.content.slice(1) = ${message.content.slice(1)}`);
		const args = message.content.split(' ').slice(1);
		const code = args.join(' ');
		let evaled = eval(code);

		if (typeof evaled !== 'string')
			evaled = require('util').inspect(evaled);

		message.channel.send(clean(evaled), {
			code: 'xl'
		});
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
};
