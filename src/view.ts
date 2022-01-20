import { Square } from "./square";


function uid () {
	return Math.floor(Math.random() * 2 ** 32).toString(16);
}

export class View {
	table: JQuery;
	uid: string;

	constructor (size: number, parent: JQuery) {
		const table = $("<div>", { class: "tictactoe" });
		this.uid = uid();
		
		table.data("uid", this.uid);

		for (let y = 0, id = 0; y < size; ++y) {
			const row = $("<div>", { class: "tictactoe__row" }).appendTo(table);
			for (let x = 0; x < size; ++id, ++x) {
				const cell = $("<div>", { class: "tictactoe__row__cell" }).appendTo(row);
				cell.data("flatId", id);
			}
		}

		parent.first().append(table);
		this.table = parent.find(".tictactoe").filter((_, x) => $(x).data("uid") === this.uid);
	}

	mark (id: number, value: Square) {
		this.table.find(".tictactoe__row__cell")
			.filter((_, x) => $(x).data("flatId") === id).text(value);
	}

	getId (object: HTMLDivElement): number {
		return this.table.find(object).data("flatId");
	}

	drawLine(ids: number[]): void {
		for (const id of ids) {
			this.table.find(".tictactoe__row__cell")
				.filter((_, x) => $(x).data("flatId") === id)
				.css("backgroundColor", "green");
		}
	}
}
