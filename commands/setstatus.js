exports.run = (client, message, args) => {
	const currentStatus = client.user.presence.status;
	const newStatus = args.slice(0).join(' ').toLowerCase();
	console.log(`DEBUG: [setstatus.js] currentStatus = "${currentStatus}"`);
	try {
		if (currentStatus == newStatus) {
			message.channel.send(`${client.user}'s status is already set to **"${newStatus}"**.`);
		}
		else if (['online', 'idle', 'dnd', 'invisible'].indexOf(newStatus)>-1) {
			client.user.setStatus(newStatus);
			message.channel.send(`${client.user}'s status has been set to **"${newStatus}"**.`);
			console.log(`DEBUG: [setstatus.js] setStatus = "${newStatus}"`);
		} else {
			message.channel.send(`\`\`\`"${newStatus}" is not a valid status.
Valid statuses: "online", "idle", "dnd" (do not disturb), "invisible"\`\`\``);
		}
	} catch (e) {
		console.error(`ERROR: [setstatus.js] = ${e}`);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ss'],
	permLevel: 3
};

exports.help = {
	name: 'setstatus',
	description: 'Set the game status',
	usage: '[setstatus]'
};