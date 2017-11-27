module.exports = client => {
	//client.user.setGame('NHK');
	client.user.setGame(`on ${client.guilds.size} servers. FUCK EIEN GUILD.`);
	console.log(`Logged in as "${client.user.tag}".`);
};
