
import { expect } from "chai";

import { Model } from "../src/model";
import { Square } from "../src/square";

describe("Model", function () {
	it("should output a line.", function () {
		const model = new Model(3, Square.Cross);

		model.set(0, Square.Nought);
		model.set(4, Square.Nought);
		model.set(8, Square.Nought);

		expect(model.readLine({
			type: "row",
			index: 0
		})).to.have.lengthOf(3);
		
		expect(model.readLine({
			type: "row",
			index: 0
		})).to.deep.equal([Square.Nought, Square.Blank, Square.Blank]);
	});

	it("shouldn't instantly be a win.", function () {
		const model = new Model(3, Square.Cross);

		expect(model.winningLines()).to.be.an("array").that.is.empty;
	});

	it("should swap the player.", function () {
		const model = new Model(3, Square.Cross);

		model.swapPlayer();

		expect(model.player).to.equal(Square.Nought);
	});

	describe("3x3", function () {
		let model;

		beforeEach(function () {
			model = new Model(3, Square.Cross);
		});

		it("should recognize a top row.");
		it("should recognize a middle row.");
		it("should recognize a low row.");

		it("should recognize a left column.");
		it("should recognize a middle column.");
		it("should recognize a right column.");

		it("should recognize a TL to LR diagonal.");
		it("should recognize a LL to TR diagonal.");
	});
	
	describe("4x4", function () {
		it("should work the same.");
	});
});
