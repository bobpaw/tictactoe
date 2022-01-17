
import { expect } from "chai";

import { Model } from "../src/model";
import { Square } from "../src/square";

describe("Model", function () {
	it("should be the right size.", function () {
		for (let i = 0; i < 10; ++i) {
			const model = new Model(i, Square.Cross);

			expect(model._data).to.have.lengthOf(i * i);
		}
	});

	it("should return the correct ids.", function () {
		const model = new Model(3, Square.Cross);

		expect(model.idsFromLine({
			type: "row",
			index: 0
		})).to.be.an("array").that.deep.equals([0, 1, 2]);
		expect(model.idsFromLine({
			type: "row",
			index: 1
		})).to.be.an("array").that.deep.equals([3, 4, 5]);
		expect(model.idsFromLine({
			type: "row",
			index: 2
		})).to.be.an("array").that.deep.equals([6, 7, 8]);
		expect(model.idsFromLine({
			type: "column",
			index: 0
		})).to.be.an("array").that.deep.equals([0, 3, 6]);
		expect(model.idsFromLine({
			type: "column",
			index: 1
		})).to.be.an("array").that.deep.equals([1, 4, 7]);
		expect(model.idsFromLine({
			type: "column",
			index: 2
		})).to.be.an("array").that.deep.equals([2, 5, 8]);
		expect(model.idsFromLine({
			type: "diagonal",
			index: "\\"
		})).to.be.an("array").that.deep.equals([0, 4, 8]);
		expect(model.idsFromLine({
			type: "diagonal",
			index: "/"
		})).to.be.an("array").that.deep.equals([2, 4, 6]);
	});

	it("should output a line.", function () {
		const model = new Model(3, Square.Cross);

		model.set(0, Square.Nought);
		model.set(4, Square.Nought);
		model.set(8, Square.Nought);
		
		expect(model.getLine({
			type: "row",
			index: 0
		})).to.be.an("array").of.length(3).that.
			deep.equals([Square.Nought, Square.Blank, Square.Blank]);
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
	});
	
	describe("4x4", function () {
		it("should work the same.");
	});
});
