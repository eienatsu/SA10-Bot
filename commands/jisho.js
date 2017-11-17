const request = require('request');
const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

exports.run = async (client, message, args) => {

	let inputKanji = args.slice(0).join(' ');
	if (!inputKanji) {
		message.channel.send('**ERROR:** No word specified.');
		console.error('DEBUG: No word specified.');
	} else {
		console.log(`DEBUG: inputKanji = '${inputKanji}`);
		let url = encodeURI(`http://jisho.org/api/v1/search/words?keyword=${inputKanji}`);
		console.log(`url = ${url}`);
		let linkURL = encodeURI(`http://jisho.org/search/${inputKanji}`);
		console.log(`urlLink = ${linkURL}`);
		request.get({
			uri: url,
			json: true
		}, (err, res, body) => {
			if (err) return console.log(err);

		// get kanji data
			let reading = body.data[0].japanese[0].reading;
		//let english = body.data[0].senses[1].english_definitions[0];
			let eng = [];

			for (let i = 0; i < body.data[0].senses[1].english_definitions.length; i++) {
				eng[i] = body.data[0].senses[1].english_definitions[i];
				console.log(`eng[${i}] = '${eng[i]}'`);
			}

			console.log(`reading = '${reading}'`);
		//console.log(`stringifyReading = ${JSON.stringify(reading)}`);
		//console.log(`stringifyEngDef = ${JSON.stringify(english)}`);

			embed
			.setColor(0x53D941)
			.setTitle(`jisho.org: ${inputKanji}`)
			.setURL(`${linkURL}`)
			//.setAuthor('Japanese-English dictionary bot by Eienatsu')
			//.setDescription(`Kanji: 人`)
			.setThumbnail('https://i.imgur.com/wtPjaqC.png')
			//.addBlankField(true)
			.addField('Kanji/Word:', `${inputKanji}`)
			.addField('Reading(s):', `${reading}`, true)
			.addField('Definition(s):', `${eng.join(', ')}`, true)
			.setTimestamp()
			.setFooter('I wish Onix would code with me');
			message.channel.send({embed});
		});
	}
};
