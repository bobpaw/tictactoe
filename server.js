let express = require("express");
const { join } = require("path");
const morgan = require("morgan");

const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.set("views", join(__dirname, "views"));

app.use(morgan("dev"));

app.use("/public", express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.get("/game", (req, res) => {
	res.render("index");
});

app.use(function (req, res) {
	res.status(404).send("404 Not found.");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
