import { Model } from "./model";
import { Square } from "./square";
import { View } from "./view";

export class Controller {
	view: View;
	model: Model;

	consturctor (size: number, parent: JQuery) {
		this.view = new View(size);
		this.model = new Model(size, Square.Nought);
		
		this.view.table.on("click", ".tictactoe__row__cell", this.handleClick);
		
		parent.append(this.view.table);
	}

	handleClick (event: JQuery.TriggeredEvent) {
		// Can probably roll this logic into Model.
		const id = this.view.getId(event.target);
		if (this.model.get(id) !== Square.Blank) return;

		this.model.set(id, this.model.player);
		this.view.mark(id, this.model.player);

		const wins = this.model.winningLines();
		if (wins.length === 0) this.model.swapPlayer();

		for (const win of wins) this.view.drawLine(win);
	}
}
