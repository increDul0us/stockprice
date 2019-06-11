var Stocks = require('stocks.js')
const express = require('express')

var stocks = new Stocks('CFV60N2I3D2IB4YF')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', async function (req, res) {
  try {
    const stock = {
      symbol: req.body.stock,
      interval: '1min',
      amount: 1
    }
    const result = await stocks.timeSeries(stock)
    if (!result) { res.send('stock not found') }
    res.send(stock.symbol + ': $' + result[0].close)
    console.log(result)
  } catch (error) {
    res.send('stock not found')
    console.log(error)
  }
})

app.listen(port, function () {
  console.log(`Server listening on port ${port}`)
})
