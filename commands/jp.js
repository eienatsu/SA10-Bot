//const Discord = require('discord.js');
const jp = require('nihongo');

exports.run = async (client, message, args) => {

	const inputJp= args.slice(0).join(' ');
	console.log(`DEBUG inputJP = ${inputJp}`);

	try {
		const parseKanji = await jp.parseKanji(inputJp);
		console.log(`DEBUG parseKanji = ${parseKanji}`);
		console.log(`DEBUG parseKanji.join = ${parseKanji.join(', ')}`);
		message.channel.send(parseKanji.join(', '));
		for (let i = 0; i < parseKanji.length; i++) {
			console.log(`DEBUG parseKanji[${i}]; = ${parseKanji[i]}`);
			
		}
	} catch (e) {
		console.error(e);
	}

	//message.channel.send(parseKanji);

};
