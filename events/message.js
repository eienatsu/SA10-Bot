const config = require('../config.json');
//const jp = require('nihongo');
module.exports = async message => {
	
	let client = message.client;
	/*if (jp.isJapanese(message.content))
		console.log(`DEBUG: jp = '${message.content}'`);*/
	
	if (message.author.bot) return;

	const reg = new RegExp(/aquor(s?)(?![a-zA-Z])/,'ig');
	const aqours = reg.test(message.content);
	if (aqours)
		message.channel.send('Its **AQOURS**. https://gfycat.com/LankyAnchoredDobermanpinscher');
	if (message.content.toLowerCase() == 'melee')
		message.channel.send('Fox');
	if (message.content.toLowerCase() == 'neet')
		message.channel.send('https://i.imgur.com/vsbBspl.png');
	if (message.content.toLowerCase() == 'become as gods')
		message.channel.send('https://i.imgur.com/L1Gt4K5.jpg');
	if (message.content.toLowerCase() == 'jojo')
		message.channel.send('https://i.imgur.com/USIqJlR.jpg');
	if (message.content.toLowerCase() =='fuck you')
		message.channel.send('https://i.imgur.com/gKP0BlJ.jpg');
	if (message.content.toLowerCase().startsWith('nico'))
		message.channel.send('https://i.imgur.com/5hV8y1H.gifv\nhttps://gfycat.com/HonorableEarlyGermanwirehairedpointer');
	if (message.content.toLowerCase() == 'double suicide')
		message.channel.send('https://i.imgur.com/033ETwg.jpg');
	if (message.content.toLowerCase() == 'synergy')
		message.channel.send('https://i.imgur.com/YiCbM2i.gifv');
	if (message.content.toLowerCase().startsWith('jordan'))
		message.channel.send('https://www.youtube.com/watch?v=VxE_TbZP2VU');
	if (message.content.toLowerCase().startsWith('howjoineien'))
		message.channel.send('https://www.youtube.com/watch?v=BY00Zvoryzw');	


	if (!message.content.startsWith(config.prefix)) return;
	console.log('------------------message.js START------------------');
	//console.log(`DEBUG: [message.js] prefix = '${config.prefix}'`);
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	console.log(`DEBUG: [message.js] args = '${args}'`);
	const command = args.shift().toLowerCase().trim();
	console.log(`DEBUG: [message.js] command = '${command}'`);
	const perms = client.elevation(message);
	


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