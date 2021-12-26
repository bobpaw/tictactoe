let express = require("express");
const { join } = require("path");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.use("/static", express.static(join(__dirname, "public")));

app.use(function (req, res) {
	res.status(404).send("404 Not found.");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
