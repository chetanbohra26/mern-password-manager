const express = require("express");
const path = require("path");

const apiRouter = require("./routes/api");

const app = express();

app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "./../build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

const PORT = process.env.PORT || 7500;
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening to port ${PORT}..!`);
});
