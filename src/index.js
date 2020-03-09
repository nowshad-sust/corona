const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

const redisClient = require("./redis-client");

app.use(morgan("tiny"));

app.get("/api/corona", async (req, res) => {
	const rawData = await redisClient.getAsync("cache");
	res.status(200).json(JSON.parse(rawData));
});

app.listen(port, () => console.log(`Corona app listening on port ${port}!`));
