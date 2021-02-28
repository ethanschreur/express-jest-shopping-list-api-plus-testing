const express = require('express');
const { ExpressError } = require('./expressError');
const items = require('./fakeDb');
const checkNameExists = require('./middleware');

const router = new express.Router();

router.get('/', function get_items(req, res, next) {
	try {
		return res.status(200).json(items);
	} catch (e) {
		return next(new ExpressError('Problem getting items', 404));
	}
});

router.post('/', function post_item(req, res, next) {
	try {
		const name = req.body['name'];
		const price = req.body['price'];
		items.push({ name, price });
		return res.status(201).json({ added: { name, price } });
	} catch (e) {
		return next(new ExpressError('Problem posting item', 404));
	}
});

router.get('/:name', checkNameExists, function get_by_name(req, res, next) {
	try {
		const resp = items.filter((e) => e['name'] === req.params.name)[0];
		return res.status(200).json(resp);
	} catch (e) {
		return next(e);
	}
});

router.patch('/:name', checkNameExists, function patch_by_name(req, res, next) {
	try {
		const index = items.findIndex(function(value, index, array) {
			return value['name'] === req.params.name;
		});
		const name = req.body['name'];
		const price = req.body['price'];
		items[index] = { name, price };
		return res.status(200).json(items[index]);
	} catch (e) {
		return next(e);
	}
});

router.delete('/:name', checkNameExists, function delete_by_name(req, res, next) {
	try {
		const index = items.findIndex(function(value, index, array) {
			return value['name'] === req.params.name;
		});
		items.splice(index, 1);
		return res.status(200).json({ message: 'Deleted' });
	} catch (e) {
		return next(`${e}`, 404);
	}
});

module.exports = router;
