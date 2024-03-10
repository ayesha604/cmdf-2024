const summarize = require('./summarize');
const express = require("express");
require('dotenv').config()
var cors = require('cors')


const PORT = process.env.PORT || 3001;

const app = express();

var whitelist = ['http://localhost:3000/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.json());
app.use(cors());

async function fetchPdfToText(pdf) {

  const data = {
    "url": "pdf",
    "lang": "eng",
    "inline": true,
    "pages": "0-",
    "async": false,
    "name": "result.txt"
  }

  const answer = await fetch('https://api.pdf.co/v1/pdf/convert/to/text-simple', {
  method: 'POST',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': 'halim.aye64@gmail.com_QRg6B1o99n4v115Eje0LM58I7221P0R9Q8RvR57a5b2zA3nxT16103fSUVUjAk7W'
  },
  body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(response => {
    return response.body;
  })
  return answer;
}

app.post("/api", async (req, res) => {
    const text = await fetchPdfToText(req.body.url).then(text => {
      summarize(text);
    });
    // const summary = await summarize(text);
    res.json({ message: text.choices[0].message.content });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



