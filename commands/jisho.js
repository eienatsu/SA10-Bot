const request = require('request');
const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

exports.run = async (client, message, args) => {

	let inputKanji = args.slice(0).join(' ');
	if (!inputKanji) {
		message.channel.send('**ERROR:** No word specified.');
		console.error('DEBUG: No word specified.');
	} else {
		console.log(`DEBUG: inputKanji = '${inputKanji}'`);
		let url = encodeURI(`http://jisho.org/api/v1/search/words?keyword=${inputKanji}`);
		let linkURL = encodeURI(`http://jisho.org/search/${inputKanji}`);
		request({uri: url, json: true}, (err, res, body) => {
			if (err) return console.log(err);

			// get kanji readings
			let reading = [];
			for (let i = 0; i < body.data[0].japanese.length; i++) {
				let jWord = body.data[0].japanese[i].word;
				let jReading = body.data[0].japanese[i].reading;

				if (jWord !== null && !jReading !== null) {
					reading += jWord + '「' + jReading + '」';
					if (i != body.data[0].japanese.length) {
						reading += '\n';
					}
				} else {
					reading += '「」';
				}
			}

			// get english definition
			let eng = [];
			for (let i = 0; i < body.data[0].senses.length; i++) {
				eng += (i+1) + '. ' + body.data[0].senses[i].english_definitions.join(', ');
				if (i != body.data[0].senses.length) {
					eng += '\n';
				}
			}

			console.log(`DEBUG: reading = '${reading}'`);
			console.log(`DEBUG: eng = '${eng}'`);

			embed
			.setColor(0x53D941)
			.setTitle(`jisho.org: ${inputKanji}`)
			.setURL(`${linkURL}`)
			//.setAuthor('Japanese-English dictionary bot by Eienatsu')
			//.setDescription(`Kanji: 人`)
			.setThumbnail('https://i.imgur.com/wtPjaqC.png')
			//.addBlankField(true)
			.addField('Kanji/Word:', `${inputKanji}`)
			.addField('Reading(s):', `${reading}`)
			.addField('Definition(s):', `${eng}`)
			.setTimestamp()
			//.setFooter('http://www.google.com');
			message.channel.send({embed});
		});
	}
};
