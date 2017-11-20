const ddiff = require('return-deep-diff');

module.exports = (oldMember, newMember) => {
	//member.guild.channels.get(config.defaultChannel).send(`${member.user} has despawned.`);
	console.log(ddiff(oldMember, newMember));
};
