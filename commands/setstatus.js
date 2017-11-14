const in_array = require('in_array');

exports.run = function(client, message, args) {
	let currentStatus = client.user.presence.status;
	let newStatus = args.slice(0).join(' ').toLowerCase();
	console.log(`DEBUG: currentStatus = "${currentStatus}"`);
	if (currentStatus == newStatus) {
		message.channel.send(`${client.user}'s status is already set to **"${newStatus}"**.`);
	}
	else if (in_array(newStatus, ['online', 'idle', 'dnd', 'invisible'])) {
		client.user.setStatus(newStatus);
		message.channel.send(`${client.user}'s status has been set to **"${newStatus}"**.`);
		console.log(`DEBUG: setStatus = "${newStatus}"`);
	} else {
		message.channel.send(`\`\`\`"${newStatus}" is not a valid status.
Valid statuses: "online", "idle", "dnd" (do not disturb), "invisible"\`\`\``);
	}
};
