const { ExpressError } = require('./expressError');
function checkNameExists(req, res, next) {
	const resp = items.filter((e) => e['name'] === req.params.name)[0];
	if (!resp) throw new ExpressError(`Item with name ${req.params.name} does not exist`);
	else {
		next();
	}
}

module.exports = checkNameExists;
