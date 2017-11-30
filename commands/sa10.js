const Discord = require('discord.js');

exports.run = (client, message) => {

	const quotes = [
		{
			quote: 'Romantic love is a trap designed to expand capitalism.',
			img: 'https://i.imgur.com/GAVnN5h.jpg'
		},
		{
			quote: 'You must face reality Sato!',
			img: 'https://i.imgur.com/XwAyqkq.png'
		},
		{
			quote: 'To think I\'d be able to see images of this level in Japan...',
			img: 'https://i.imgur.com/sw3oGwW.png'
		},
		{
			quote: 'Wait for me, digital world!! https://gfycat.com/FatLivelyAfricanrockpython',
			img: 'https://i.imgur.com/mKvy8tD.png'
		},
		{
			quote: 'Wait for me, digital world!! https://gfycat.com/FatLivelyAfricanrockpython',
			img: 'https://i.imgur.com/mKvy8tD.png'
		},
		{
			quote: 'I\'m a creator!!',
			img: 'https://i.imgur.com/E9Ia99o.png'
		},
		{
			quote: 'What does \"object-oriented\" mean?',
			img: 'https://i.imgur.com/ySKe4P6.png'
		},
		{
			quote: 'It\'s like, my body still feels sluggish.',
			img: 'https://i.imgur.com/Ivex0GF.png'
		},
		{
			quote: 'I turn my back on this percect everyday life.',
			img: 'https://i.imgur.com/h2KRKfD.png'
		},
		{
			quote: 'That\'s all right! Just knowing ythat you\'ve got a girlfriend is such a relief!',
			img: 'https://i.imgur.com/kF1H1YM.png'
		},
		{
			quote: 'Lucky for me, I happen to know just the slut to ask.',
			img: 'https://i.imgur.com/o38PIUC.png'
		},
		{
			quote: 'As long as I\'m doing something with a goal in mind, I\'m not a hikikomori!',
			img: 'https://i.imgur.com/43oZaIQ.png'
		},
		{
			quote: 'A cute girl like her?!',
			img: 'https://i.imgur.com/S4P2MmA.png'
		},
		{
			quote: 'I am the man who became aware of the N.H.K.\'s conspiracy.',
			img: 'https://i.imgur.com/VOD8kLz.png'
		},
		{
			quote: 'たっちゃん～',
			img: 'https://i.imgur.com/1XXXfqy.png'
		},
		{
			quote: 'Romantic feelings are nothing but chemical reactions. https://i.imgur.com/4xoRjPr.gifv',
			img: 'https://i.imgur.com/3BM24Ah.png'
		},
		{
			quote: 'Secret collection?',
			img: 'https://i.imgur.com/u2VhSGK.png'
		},
		{
			quote: 'You know damn well I\'d never waste my time on real girls!',
			img: 'https://i.imgur.com/XYFHfCc.png'
		},
		{
			quote: 'W-What are you talking about?',
			img: 'https://i.imgur.com/U3Z6EoE.jpg'
		},
		{
			quote: 'SA10',
			img: 'https://i.imgur.com/vsbBspl.png'
		}
	];

	let min = Math.ceil(0);
	let max = Math.floor(quotes.length);
	console.log('DEBUG [sa10.js] min = ' + min);
	console.log('DEBUG [sa10.js] max = ' + max);
	const randomNum = Math.floor(Math.random() * ((max - min)) + min);
	console.log('DEBUG [sa10.js] random number = ' + randomNum);

	console.log('DEBUG [sa10.js] random quote = ' + JSON.stringify(quotes[randomNum]));

	const embed = new Discord.RichEmbed()
		//.setColor(0xFFFFFF)
		.setTitle('NHKにようこそ')
		.setURL('https://myanimelist.net/anime/1210/NHK_ni_Youkoso')
		//.setThumbnail('')
		.setImage(`${quotes[randomNum].img}`)
		.setDescription(`${quotes[randomNum].quote}`);
		//.setFooter('');
	message.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'sa10',
	description: 'Get random NHK quote',
	usage: '[sa10]'
};