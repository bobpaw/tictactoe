import { Square } from "square";

export class Model {
	size: number;
	_data: Square[];

	constructor(size: number) {
		this.size = size;
		this._data = Array(size * size).map(() => Square.Blank);
	}

	row (r: number): Square[] {
		if (r < 0 || r >= this.size) throw new RangeError(`r must be in the range [0, ${this.size}).`);
		return this._data.slice(r * this.size, (r + 1) * this.size);
	}
  
	column(c: number): Square[] {
		if (c < 0 || c >= this.size) throw new RangeError(`c must be in the range [0, ${this.size}).`);
		return this._data.filter((_, i) => i % this.size === c);
	}

	diagonal(topDir: "forward" | "/" | "back" | "\\"): Square[] {
		if (topDir === "forward" || topDir === "/") {
			return this._data.filter((_, i) => i % (this.size + 1) === 0);
		} else {
			return this._data.filter((_, i) => i % (this.size - 1) === 0).slice(1, -1);
		}
	}

	distill(line: Square[]): Square {
		return line.reduce((prev, cur) => {
			if (prev === cur) return cur;
			else return Square.Different;
		});
	}

	match (): Square {
		const lines = [this.diagonal("forward"), this.diagonal("back")];
		for (let i = 0; i < this.size; ++i) lines.push(this.row(i), this.column(i));
		for (const l of lines) {
			const d = this.distill(l);
			if (d === Square.Cross || d === Square.Nought) return d;
		}
	}

	get (id: number): Square {
		return this._data[id];
	}

	set (id: number, value: Square): void {
		this._data[id] = value;
	}
}
