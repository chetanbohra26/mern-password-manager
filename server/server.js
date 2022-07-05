const express = require("express");
const path = require("path");
const cors = require("cors");

const apiRouter = require("./routes/api");

const app = express();

const ENVIRONMENT = app.settings.env;
console.log("[INFO] Environement:", ENVIRONMENT);

if (ENVIRONMENT === "development") {
	require("dotenv").config();
	app.use(cors());
}

const { init } = require("./sequelize");
init();

app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "./../build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

const PORT = process.env.PORT || 7500;
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`[INFO] Listening on port ${PORT}`);
});