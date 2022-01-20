
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;


import { Model } from "../src/model";
import { Square } from "../src/square";

describe("Model", function () {
	it("should not accept invalid sizes.", function () {
		expect(() => new Model(-3984, "X")).to.throw(RangeError, "size");
		expect(() => new Model(0, "X")).to.throw(RangeError, "size");
	});

	it("should accept Square, 'X' or 'O'.", function () {
		expect(new Model(3, Square.Cross).player).to.equal(Square.Cross);
		expect(new Model(3, Square.Nought).player).to.equal(Square.Nought);
		expect(new Model(3, "X").player).to.equal(Square.Cross);
		expect(new Model(3, "O").player).to.equal(Square.Nought);
	});

	it("should be the right size.", function () {
		for (let i = 0; i < 10; ++i) {
			const model = new Model(i, Square.Cross);

			expect(model._data).to.have.lengthOf(i * i);
		}
	});

	it("should get and set values.", function () {
		const model = new Model(4, Square.Cross);

		model.set(4, Square.Nought);
		expect(model._data[4]).to.equal(Square.Nought);
		expect(model.get(4)).to.equal(Square.Nought);
	});

	describe("idsFromLine()", function () {
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

		it("should throw for bad indexes.", function () {
			const model = new Model(3, Square.Cross);
			
			expect(() => model.idsFromLine({
				type: "row", index: -2
			})).to.throw(RangeError, "c must be in the range");

			expect(() => model.idsFromLine({
				type: "row", index: 4
			})).to.throw(RangeError, "c must be in the range");
		});
	});

	describe("getLine()", function () {
		it("should get a line.", function () {
			const model = new Model(3, Square.Cross);
	
			const getStub = sinon.spy(model, "get");
			
			expect(model.getLine({
				type: "row",
				index: 0
			})).to.be.an("array").of.length(3);
	
			expect(getStub).to.have.been.calledThrice;
			
			getStub.restore();
		});
	});

	describe("setLine()", function () {
		let model, setStub;

		before(function () {
			model = new Model(3, Square.Cross);
			setStub = sinon.spy(model, "set");
		});
		afterEach(function () {
			setStub.resetHistory();
		});
		after(function () {
			setStub.restore();
		});

		it("should set an array.", function () {
			model.setLine({
				type: "diagonal", index: "/"
			}, [Square.Nought, Square.Different, Square.Blank]);
	
			expect(setStub).to.have.been.calledThrice;
			expect(setStub).to.have.been.calledWithExactly(2, Square.Nought);
			expect(setStub).to.have.been.calledWithExactly(4, Square.Different);
			expect(setStub).to.have.been.calledWithExactly(6, Square.Blank);
		});
		it("should throw for wrongly-sized arrays.", function () {
			const line = {
				type: "column", index: 1
			};

			expect(() => model.setLine(line, [Square.Blank])).to.throw("values");
			expect(() => model.setLine(line, Array(2).fill(Square.Blank)))
				.to.throw("values");
			expect(() => model.setLine(line, Array(4).fill(Square.Blank)))
				.to.not.throw();
			expect(setStub).to.have.been.calledThrice;
		});
		it("should set one value.", function () {
			model.setLine({
				type: "column", index: 2
			}, Square.Cross);
	
			expect(setStub).to.have.been.calledThrice;
			expect(setStub).to.have.been.calledWithExactly(2, Square.Cross);
			expect(setStub).to.have.been.calledWithExactly(5, Square.Cross);
			expect(setStub).to.have.been.calledWithExactly(8, Square.Cross);
		});
	});

	describe("winningLines()", function () {
		it("should start empty.", function () {
			const model = new Model(3, Square.Cross);
	
			expect(model.winningLines()).to.be.an("array").that.is.empty;
		});
	
		it("should detect a win.", function () {
			const model = new Model(4, Square.Cross);

			model.setLine({ type: "column", index: 2 }, Square.Cross);
			expect(model.winningLines()).to.be.an("array").of.length(1)
				.that.deep.equals([{ type: "column", index: 2 }]);
		});
	});

	it("should swap the player.", function () {
		const model1 = new Model(3, Square.Cross);
		const model2 = new Model(3, Square.Nought);

		model1.swapPlayer();
		model2.swapPlayer();

		expect(model1.player).to.equal(Square.Nought);
		expect(model2.player).to.equal(Square.Cross);
	});

	describe("click()", function () {
		let model;

		beforeEach(function () {
			model = new Model(3, "X");
		});

		it("should click blank squares.", function () {
			expect(model.click(2)).to.be.true;
		});
		it("should set it to the right value", function () {
			model.click(2);
			expect(model.get(2)).to.equal(Square.Cross);
		});
		it("should swap the player.", function () {
			model.click(2);
			expect(model.player).to.equal(Square.Nought);
		});
		it("should not click non-blank squares.", function () {
			model.set(2, Square.Nought);
			expect(model.click(2)).to.be.false;
		});
	});
	
	describe("4x4", function () {
		it("should work the same.");
	});
});
