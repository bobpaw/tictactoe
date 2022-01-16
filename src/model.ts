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
		this._data = Array(size * size).map(() => Square.Blank);
		this.player = player;
	}

	readLine (line: Line): Square[] {
		if (line.type === "diagonal") {
			if (line.index === "/")
				return this._data.filter((_, i) => i % (this.size + 1) === 0);
			else if (line.index === "\\")
				return this._data.filter((_, i) => i % (this.size - 1) === 0).slice(1, -1);
		} else {
			if (line.index < 0 || line.index >= this.size)
				throw new RangeError(`c must be in the range [0, ${this.size}).`);
			if (line.type === "row")
				return this._data.slice(
					line.index as number * this.size,
					(line.index as number + 1) * this.size
				);
			else if (line.type === "column")
				return this._data.filter((_, i) => i % this.size === this.size);
		}
	}

	distill(line: Line): Square {
		return this.readLine(line).reduce((prev, cur) => {
			if (prev === cur) return cur;
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
		this.player = this.player === Square.Nought ? Square.Nought : Square.Cross;
	}

	// tick (id: number) {}
}
