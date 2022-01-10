import { Square } from "square";

export class View {
	table: JQuery;

	constructor (size: number) {
		this.table = $("<div>", { class: "tictactoe" });


		for (let y = 0, id = 0; y < size; ++y) {
			const row = $("<div>", { class: "tictactoe__row" }).appendTo(this.table);
			for (let x = 0; x < size; ++id, ++y) {
				const cell = $("<div>", { class: "tictactoe__row__cell" }).appendTo(row);
				cell.data("flatId", id);
			}
		}
	}

	mark (id: number, value: Square) {
		this.table.find(`.tictactoe__row__cell[data-flatId=${id}]`).text(value);
	}

	getId (object: HTMLDivElement): number {
		return this.table.find(object).data("flatId");
	}
}
