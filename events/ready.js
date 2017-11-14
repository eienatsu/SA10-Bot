
module.exports = client => {
	client.user.setGame('NHK');
	console.log(`Logged in as "${client.user.tag}".`);
};
