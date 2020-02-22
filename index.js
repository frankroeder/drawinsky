const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + `/public`))

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
app.post('/data', function (req, res) {
  console.log(req.body)
  const writeObj = {
    "word": req.body.word,
    "countrycode": "DE",
    "timestamp": new Date().toUTCString(),
    "recognized": true,
    "key_id": uuidv4().toString(),
    "drawing": req.body.ink
  }
  fs.appendFile('sketches.ndjson', `${JSON.stringify(writeObj)}\n`, function (err) {
    if (err) {
      throw err
    }
    res.send()
  })
})
console.log("starting backend on port", port)
app.listen(port)
