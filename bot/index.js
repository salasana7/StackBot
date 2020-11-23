const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { getOH } = require("./oh-function");

// function to send emails

const sendEmail = require("gmail-send")({
  user: "stackBot1337@gmail.com",
  pass: process.env.GMAIL_PASS,
});

// emails array
let emails = {};

//bot function to get oh every 2 minutes

const runBot = async () => {
  let ohArr = await getOH();
  console.log(ohArr);
  for (const oh of ohArr) {
    if (!oh.open) continue;
    const firstName = oh.name.split(" ")[0];
    if (firstName in emails) {
      for (const email of emails[firstName]) {
        sendEmail({
          to: email,
          subject: `StackBot: ${oh.name} has availible OH!`,
          text: `There are ${oh.open} open slots on ${oh.time}. Go grab them before someone else does!

                    - StackBot`,
        });
      }
      delete emails[firstName];
    }
  }
};

// rising edge interval

setInterval(runBot, 120000);

runBot();

// express routes

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

//post route to get emails

app.post("/api/email", (req, res, next) => {
  try {
    const { email, host } = req.body;
    if (!(host in emails)) emails[host] = new Set([email]);
    else emails[host].add(email);
    console.log(emails);
    res.send("success");
  } catch (error) {
    next(error);
  }
});

// error handlers

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
