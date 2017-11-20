module.exports = member => {
	//member.guild.channels.get(config.defaultChannel).send(`${member.user} has despawned.`);
	console.log(`"${member.user.username}" has despawned at ${new Date()}.`);
};
