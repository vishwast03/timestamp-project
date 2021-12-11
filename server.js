// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
]
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;

  if(/\d{5,}/.test(dateString)) {

    const date = new Date(parseInt(dateString));

    res.json({unix: date.getTime(), utc: date.toUTCString()});

  }
  else {
    
    const date = new Date(dateString);

    if(date.toString() === "Invalid Date") {

      res.json({error: "Invalid Date"});

    }
    else {

      res.json({unix: date.getTime(), utc: date.toUTCString()});

    }

  }

});

// app.get("/api/:date?", function (req, res) {

//   let date;
//   let regexp = /^[0-9]+$/;
//   if (req.params.date) {
//     if (req.params.date.match(regexp))
//       date = new Date(parseInt(req.params.date));
//     else
//       date = new Date(req.params.date);
//   }
//   else {
//     date = new Date();
//   }

//   if (isNaN(date.getTime())) {
//     res.json({ error: "Invalid Date" });
//   }
//   else {
//     const unixDate = date.getTime();

//     const utcDay = `${weekDays[date.getUTCDay()]}`;
//     const utcDate = `${date.getUTCDate()}`;
//     const utcMonth = `${months[date.getUTCMonth()]}`;
//     const utcYear = `${date.getUTCFullYear()}`;
//     const utcHour = `${date.getUTCHours() === 0 ? "00" : date.getUTCHours()}`;
//     const utcMinute = `${date.getUTCMinutes() === 0 ? "00" : date.getUTCMinutes()}`;
//     const utcSecond = `${date.getUTCSeconds() === 0 ? "00" : date.getUTCSeconds()}`;

//     const utcDateString = `${utcDay}, ${utcDate} ${utcMonth} ${utcYear} ${utcHour}:${utcMinute}:${utcSecond} GMT`;

//     res.json({ unix: unixDate, utc: utcDateString });
//   }
// });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
// var listener = app.listen(3000, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });