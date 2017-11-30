const Discord = require('discord.js');
const request = require('request');
//module.exports.getJisho;

exports.run = (client, message, args) => {

	const getJisho = async () => {
		const inputKanji = args.slice(0).join(' ');
		if (!inputKanji) {
			message.channel.send('**ERROR:** No word specified.');
			console.error('DEBUG: No word specified.');
		} else {
			console.log(`DEBUG: inputKanji = '${inputKanji}'`);
			const url = encodeURI(`http://jisho.org/api/v1/search/words?keyword=${inputKanji}`);
			const linkURL = encodeURI(`http://jisho.org/search/${inputKanji}`);
			await request({uri: url, json: true}, (err, res, body) => {
				if(!err && res.statusCode === 200) {
					display(body, linkURL);
				}
			});
		}
	};
	
	const display = (body, linkURL) => {
		try {
			// get kanji readings
			let reading = [], jReading = [], jWord = [];
			for (let i = 0; i < body.data[0].japanese.length; i++) {
				console.log(`------------------LOOP START (i = ${i})------------------`);
				jWord[i] = body.data[0].japanese[i].word;
				jReading[i] = body.data[0].japanese[i].reading;

				if (!jWord[i] || !jReading[i]) {
					jWord[i] = '';
					jReading[i] = '';
				} else {
					jWord[i] = body.data[0].japanese[i].word;
					jReading[i] = '「' + body.data[0].japanese[i].reading + '」';
				}
				reading[i] = jWord[i] + jReading[i] ;
				if (i != body.data[0].japanese.length)
					reading += '\r\n';
			}

			// create  meaning line. combine pos and eng.
			var line = [];
			for (let i = 0; i < body.data[0].senses.length; i++) {
				// get parts of speech
				console.log(`------------------LOOP START (i = ${i})------------------`);
				let pos_a = [];
				for (let j = 0; j < body.data[0].senses[i].parts_of_speech.length; j++) {
					pos_a[j] = `*${body.data[0].senses[i].parts_of_speech[j]}*`;
					console.log(`DEBUG: pos_a[${j}] = '${pos_a[j]}'`);
				}

				let pos = pos_a.join(', ');
				console.log(`DEBUG: pos.join = '${pos}'`);
				if (pos)
					pos += ': ';

				let eng = body.data[0].senses[i].english_definitions.join(', ');
				line += `${(i+1)}. ${pos}${eng}`;
				if(pos && eng)
					eng = ' ' + eng;
				if (i != body.data[0].senses.length)
					line += '\r\n';
			}

			console.log(`DEBUG: reading = ${reading}`);
			console.log(`DEBUG: line = \r\n${line}`);

			let tag = `\`${body.data[0].tags[0]}\``;

			const embed = new Discord.RichEmbed()
				.setColor(0x53D941)
				.setTitle('Reference')
				.setURL(`${linkURL}`)
				.setThumbnail('https://i.imgur.com/wtPjaqC.png')
				.addField('Reading:', `${reading}`)
				.addField('Definition:', `${line}`)
				.addField('Tag:', `${tag}`)
				.setTimestamp();
				//.setFooter('http://www.google.com');
			message.channel.send(embed);
		} catch (e) {
			console.error(e);
		}
	};
	getJisho();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['j'],
	permLevel: 0
};

exports.help = {
	name: 'jisho',
	description: 'Translate kanji (漢字) and Japanese words (言葉)',
	usage: '[jisho] [kanji/kotoba]'
};