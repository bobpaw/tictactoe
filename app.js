const { join } = require("path");
const express = require("express");
const morgan = require("morgan");

exports.default = function Application (rootDir, port) {
	const app = express();

	app.set("view engine", "ejs");

	app.set("views", join(rootDir, "views"));

	app.use(morgan("dev"));

	app.use("/public", express.static(join(rootDir, "public")));

	app.get("/", (req, res) => {
		res.send("Hello world");
	});

	app.get("/game", (req, res) => {
		res.render("index");
	});

	app.use(function (req, res) {
		res.status(404).send("404 Not found.");
	});

	if (typeof port === "number") {
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	}

	return app;
};
