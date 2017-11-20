const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
//require('./config.json');
require('./util/eventLoader')(client);
//const embed = new Discord.RichEmbed();
//const search = require('animelyrics');
require('console-stamp')(console, {
	pattern: '[mm/dd/yyyy HH:MM:ss.l]'
});

// Login authentication token for Bot
client.login(auth.token);

// client.on('messageDeleteBulk', (message) => {
// 	console.log(`"${message.size}" messages were deleted.`);
// });
