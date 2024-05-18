// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
      // Create a Date object from the input date string
    date = new Date();
  } else {
    // Create a Date object from the input date string
    if (!isNaN(dateString)) {
      // Convert numeric strings to numbers
      dateString = parseInt(dateString, 10);
    }
    date = new Date(dateString);
  }


  // Convert to Unix timestamp and UTC string in the required format
  const unixTimestamp = date.getTime();

  if (isNaN(unixTimestamp)) {
      return res.status(400).json({ error: 'Invalid date' });
  }

  const utcString = date.toUTCString();

  res.json({
      unix: unixTimestamp,
      utc: utcString
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
