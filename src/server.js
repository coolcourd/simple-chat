const express = require('express');
const bodyParser = require('body-parser')
const https = require('https')


const { getData, addData } = require('./functions');
const config = require("../config.json")

const app = express()
app.use(bodyParser.json())
app.use(express.static("public"));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.get('/room/:room', (req, res) => {
  const path = req.originalUrl.replace(/\//g, "-").substr(6)
  res.render("index", {
    path,
    messages: getData(path)
  })
})

app.get('/', (req, res) => {
  res.render("home", {})
})

app.post('/room/:room', (req, res) => {
  const path = req.originalUrl.replace(/\//g, "-").substr(6)
  if (!req.body.message) {
    res.send(JSON.stringify({error: "There is no message"})).status(401)
  }
  if (!req.body.name) {
    req.body.name = "Mystery Person"
  }
  req.body.time = new Date().getTime()
  // req.body.ip = req.connection.remoteAddress
  addData(path, req.body)
  res.send(req.body)
})



if (config.env === "prod") {
  const privateKey = fs.readFileSync( config.key );
  const certificate = fs.readFileSync( config.cert );
  https.createServer({
    key: privateKey,
    cert:  certificate
  }, app).listen(443)
} else { 
    const port = 3001
    app.listen(port)
    console.log(`app is running at http://localhost:${port}`)
  }
