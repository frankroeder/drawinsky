const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + `/public`))

app.post('/data', function (req, res) {
  console.log(req.body)
  const writeObj = {
    "word": req.body.word,
    "countrycode": "DE",
    "timestamp": new Date().toUTCString(),
    "recognized": true,
    "drawing": req.body.ink
  }
  fs.appendFile('test.ndjson', `${JSON.stringify(writeObj)}\n`, function (err) {
    if(err) {
      throw err
    }
    res.send()
  })
})

app.listen(port)

