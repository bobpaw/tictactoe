import { Square } from "./square";

type Line = {
	type: "row" | "column" | "diagonal";
	index: number | "/" | "\\";
};

type PlayType = Square.Cross | Square.Nought;

// Behavior currently undefined after Model.winningLines().length !== 0.
export class Model {
	size: number;
	_data: Square[];
	player: PlayType;
	// TODO: Add line caching maybe idk. Test speed if you do.

	constructor(size: number, player: PlayType) {
		this.size = size;
		this._data = new Array(size * size).fill(Square.Blank);
		this.player = player;
	}

	idsFromLine (line: Line): number[] {
		const ids = [...this._data.keys()];

		if (line.type === "diagonal") {
			if (line.index === "/") {
				return ids.filter(id => id % (this.size - 1) === 0, this).slice(1, -1);
			} else if (line.index === "\\") {
				return ids.filter(id => id % (this.size + 1) === 0, this);
			}
		} else {
			if (line.index < 0 || line.index >= this.size)
				throw new RangeError(`c must be in the range [0, ${this.size}).`);
			if (line.type === "row" && typeof line.index === "number") {
				const start = this.size * line.index;
				return ids.slice(start, start + this.size);
			} else if (line.type === "column" && typeof line.index === "number")
				return ids.filter(id => id % this.size === line.index);
		}
	}

	// Guaranteed to return an array of length this.size.
	getLine (line: Line): Square[] {
		return this.idsFromLine(line).map(id => this.get(id));
	}

	setLine (line: Line, values: Square[]): void {
		if (values.length < this.size)
			throw new Error(`values must be at least length ${this.size}.`);
		
		const ids = this.idsFromLine(line);
		for (let i = 0; i < this.size; ++i)
			this.set(ids[i], values[i]);
	}

	distill(line: Line): Square {
		return this.getLine(line).reduce((prev, cur) => {
			if (prev === cur) return prev;
			else return Square.Different;
		});
	}
	
	winningLines (): Line[] {
		const lines: Line[] = [
			{ type: "diagonal", index: "/" },
			{ type: "diagonal", index: "\\" }
		];
		for (let i = 0; i < this.size; ++i) lines.push(
			{ type: "row", index: i },
			{ type: "column", index: i }
		);
		return lines.filter(l => {
			const d = this.distill(l);
			return d === Square.Cross || d === Square.Nought;
		});
	}

	get (id: number): Square {
		return this._data[id];
	}

	set (id: number, value: Square): void {
		this._data[id] = value;
	}

	swapPlayer (): void {
		this.player = (this.player === Square.Nought ? Square.Cross : Square.Nought);
	}

	// tick (id: number) {}
}
