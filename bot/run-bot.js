const { getOH } = require("./oh-function");

setInterval(async () => {
  const ohArr = await getOH();
  console.log(ohArr);
}, 30000);

