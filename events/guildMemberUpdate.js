const ddiff = require('return-deep-diff');

module.exports = (oldMember, newMember) => {
	try {
		console.log(ddiff(oldMember, newMember));
	} catch (e) {
		console.error(e);
	}
};
