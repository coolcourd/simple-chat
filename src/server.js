const express = require('express');
var bodyParser = require('body-parser')

const { getData, addData } = require('./functions'); 

const app = express()
app.use(bodyParser.json())
app.use(express.static("public"));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.get('/room/:room', (req, res) => {
  const path = req.originalUrl.replace(/\//g, "-").substr(6)
//   addData(path, {
//     "name":  "Elizabeth",
//     "message": "I miss you",
//     "time": "10:33"
// })
  res.render("index", {
    path,
    messages: getData(path)
  })
})

app.post('/room/:room', (req, res) => {
  const path = req.originalUrl.replace(/\//g, "-").substr(6)
  if (!req.body.message) {
    res.send(JSON.stringify({error: "There is no message"})).status(401)
  }
  if (!req.body.name) {
    req.body.name = "Mystery Person"
  }
  req.body.time = new Date().toLocaleString()
  // req.body.ip = req.connection.remoteAddress
  addData(path, req.body)
  res.send(req.body)
})


const port = 3001
app.listen(3001)
console.log(`app is running at http://localhost:${port}`)