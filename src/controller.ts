import { Model } from "./model.js";
import { View } from "./view.js";

export class Controller {
	view: View;
	model: Model;

	constructor (size: number, parent: JQuery) {
		this.view = new View(size, parent);
		this.model = new Model(size, "X");
		
		this.view.table.on("click.tictactoe", ".tictactoe__row__cell",
			this.handleClick.bind(this)
		);
	}

	handleClick (event: JQuery.TriggeredEvent) {
		console.log("handleClick called.");
		const id = this.view.getId(event.target);
		
		// Attempt to click.
		if (!this.model.click(id)) return;
		
		this.view.mark(id, this.model.get(id));

		if (this.model.winningLines().length !== 0) this.win();
	}

	win () {
		this.view.table.off("click.tictactoe", ".tictactoe__row__cell");

		for (const line of this.model.winningLines())
			this.view.drawLine(line);
	}
}
