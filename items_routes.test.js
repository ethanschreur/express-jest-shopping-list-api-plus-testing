process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
let items = require('./fakeDb');
let item = { name: 'cucumber', price: 9.99 };
let newItem = { name: 'veggie burger', price: 12.99 };

beforeEach(function() {
	items.push(item);
});
afterEach(function() {
	items.length = 0;
});

describe('GET /', function() {
	test('get the list of items', async function() {
		const resp = await request(app).get('/items');
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual([ item ]);
	});
});

describe('POST /', function() {
	test('post an item', async function() {
		const resp = await request(app).post('/items').send(item);
		expect(resp.statusCode).toBe(201);
		expect(items.length).toEqual(2);
		expect(resp.body).toEqual({ added: item });
	});
});

describe('GET /:name', function() {
	test('get an item', async function() {
		const resp = await request(app).get(`/items/${item['name']}`);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(item);
	});
});

describe('PATCH /:name', function() {
	test('get an item', async function() {
		const resp = await request(app).patch(`/items/${item['name']}`).send(newItem);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(newItem);
	});
});

describe('DELETE /:name', function() {
	test('get an item', async function() {
		const resp = await request(app).delete(`/items/${item['name']}`);
		expect(resp.statusCode).toBe(200);
		expect(items.length).toEqual(0);
		expect(resp.body).toEqual({ message: 'Deleted' });
	});
});
