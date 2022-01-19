import { Model } from "./model";
import { View } from "./view";

export class Controller {
	view: View;
	model: Model;

	constructor (size: number, parent: JQuery) {
		this.view = new View(size);
		this.model = new Model(size, "X");
		
		this.view.table.on("click", ".tictactoe__row__cell",
			this.handleClick.bind(this)
		);
		
		parent.append(this.view.table);
	}

	handleClick (event: JQuery.TriggeredEvent) {
		console.log("handleClick called.");
		const id = this.view.getId(event.target);
		
		// Attempt to click.
		if (!this.model.click(id)) return;
		
		this.view.mark(id, this.model.get(id));

		const wins = this.model.winningLines();
		if (wins.length === 0)
			this.model.swapPlayer();
		else
			for (const win of wins) this.view.drawLine(win);
	}
}
