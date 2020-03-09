const FILENAME = "corona-stat.xlsx";

const proxies = [
  { ip: "178.62.229.139", port: 8080 },
  { ip: "85.0.123.180", port: 64527 },
  { ip: "84.201.254.47", port: 3128 },
  { ip: "51.15.76.119", port: 8118 },
  { ip: "163.172.182.164", port: 3128 },
  { ip: "163.172.168.124", port: 3128 },
  { ip: "145.239.116.206", port: 3128 },
  { ip: "178.62.85.7", port: 8118 }
];

const randProxy = () =>
  proxies[Math.floor(Math.random() * (proxies.length - 1))];

module.exports = {
  randProxy,
  FILENAME
};
