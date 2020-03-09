const xlsx = require("node-xlsx");
const fs = require("fs");
const axios = require("axios");
const { CronJob } = require("cron");
const redisClient = require("./redis-client");
const { FILENAME } = require("./vars");

const formatData = rawData => {
  const columns = rawData[0];
  const rows = rawData.slice(1);
  return rows.map(row =>
    row.reduce((obj, col, idx) => ({ ...obj, [columns[idx]]: col }), {})
  );
};

const saveFileAndCache = async () => {
  const options = {
    responseType: "arraybuffer",
    url:
      "https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/data/Coronavirus.current.csv",
    method: "get",
    headers: { "Content-Type": "blob" }
  };
  const { data } = await axios(options);
  const file = fs.writeFileSync(FILENAME, data);

  // Parse a file
  const [workSheetsFromFile] = await xlsx.parse(`${__dirname}/../${FILENAME}`);
  const cache = formatData(workSheetsFromFile.data);
  console.log("setting redis cahce");
  redisClient.setAsync("cache", JSON.stringify(cache));
};

const job = new CronJob("0 */1 * * * *", saveFileAndCache, null, true);

job.start();
