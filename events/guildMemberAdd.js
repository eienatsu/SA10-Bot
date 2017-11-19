const config = require('../config.json');

module.exports = member => {
	member.guild.channels.get(config.defaultChannel).send(`${member.user} has spawned.`);
	console.log(`"${member.user.username}" has spawned. at ${new Date()}`);
};
