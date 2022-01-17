const { expect } = require("chai");
const request = require("supertest");

const Application = require("../app.js");

const app = Application();

describe("GET /", function () {
	it("should return 'Hello World'.", async function () {
		const req = await request(app).get("/");
		
		expect(req.text).to.equal("Hello world");
		expect(req.status).to.equal(200);
	});
});
