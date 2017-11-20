const Discord = require('discord.js');
const request = require('request');
const jp = require('nihongo');

exports.run = (client, message, args) => {

	const parseJpKanji = async () => {
		const inputJp = args.slice(0).join(' ');
		console.log(`DEBUG inputJP = ${inputJp}`);
		try {
			const parseKanji = await jp.parseKanji(inputJp);
			console.log(`DEBUG parseKanji.join = ${parseKanji.join(', ')}`);
			message.channel.send(`Parsing the the following kanji: ${parseKanji.join(', ')}`);
			for (let i = 0; i < parseKanji.length; i++) {
				console.log(`DEBUG parseKanji[${i}]; = ${parseKanji[i]}`);
				await getJisho(parseKanji[i]);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const getJisho = async (parseKanji) => {
		if (!parseKanji) {
			console.error('DEBUG: No word specified.');
		} else {
			console.log(`DEBUG: parseKanji = '${parseKanji}'`);
			const url = encodeURI(`http://jisho.org/api/v1/search/words?keyword=${parseKanji}`);
			const linkURL = encodeURI(`http://jisho.org/search/${parseKanji}`);
			await request({uri: url, json: true}, async (err, res, body) => {
				if(!err && res.statusCode === 200) {
					await display(body, linkURL);
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

			let embed = new Discord.RichEmbed()
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
	parseJpKanji();
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'jp',
	description: '*For testing-only:* Isolates kanji in a sentense by themselves',
	usage: 'jp [command][string]'
};