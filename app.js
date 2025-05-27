const { join } = require("path");
const express = require("express");
const morgan = require("morgan");

module.exports = function Application (port) {
	const app = express();

	app.set("view engine", "ejs");

	app.set("views", join(__dirname, "views"));

	/* istanbul ignore next */
	if (process.env.NODE_ENV !== "test") {
		app.use(morgan("dev"));
	}

	app.use("/public", express.static(join(__dirname, "public")));

	app.get("/", (req, res) => {
		res.send("Hello world");
	});

	app.get("/game", (req, res) => {
		res.render("index");
	});

	app.post("/newgame", (req, res) => {

	});

	app.post("/join/:uid", (req, res) => {});

	app.use(function (req, res) {
		res.status(404).send("404 Not found.");
	});

	/* istanbul ignore next */
	if (typeof port === "number") {
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	}

	return app;
};
