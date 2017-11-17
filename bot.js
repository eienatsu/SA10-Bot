const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
//require('./config.json');
require('./util/eventLoader')(client);
//const embed = new Discord.RichEmbed();

//const fs = require('fs');
const ddiff = require('return-deep-diff');
//const request = require('request');
//const search = require('animelyrics');
require('console-stamp')(console, {
	pattern: '[mm/dd/yyyy HH:MM:ss.l]'
});

var defaultChannel = '375494044962390016';

// Login authentication token for Bot
client.login(auth.token);

client.on('guildMemberAdd', (member) => {
	member.guild.channels.get(defaultChannel)
    .send(`${member.user} has spawned.`);
	console.log(`"${member.user.username}" has spawned. at ${new Date()}`);
});

client.on('guildMemberRemove', (member) => {
	member.guild.channels.get(defaultChannel)
    .send(`${member.user} has despawned.`);
	console.log(`"${member.user.username}" has despawned at ${new Date()}.`);
});

// emitted whenever a guild member changes: new role, removed role, nickname
client.on('guildMemberUpdate', (oldMember, newMember) => {
	console.log(ddiff(oldMember, newMember));
});

// when someone gets banned
client.on('guildBanAdd', (guild, user) => {
	guild.channels.get(defaultChannel).send(`**${user.username}** was just banned.`);
	console.log(`**${user.username}** was just banned at ${new Date()}.`);
});

// when someone gets unbanned
client.on('guildBanRemove', (guild, user) => {
	guild.channels.get(defaultChannel).send(`**${user.username}** was just unbanned.`);
	console.log(`**${user.username}** was just banned at ${new Date()}.`);
});

// client.on('messageDeleteBulk', (message) => {
// 	console.log(`"${message.size}" messages were deleted.`);
// });
