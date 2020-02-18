const express = require('express')
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const path = require('path')
const Shop = require('./models').shop
const Coffee = require('./models').coffee

// Shop.create({
//   name: 'Koupie'
// }).then(shop => {
//   shop.createCoffee({
//     name: 'Kopi Aceh',
//     type: 'Dark'
//   }).then(() => console.log('Worked!'))
// })

// Shop.findAll({
//   include: [Coffee]
// }).then({
//   include: [Coffee]
// }).then(shops => {
//   console.log(shops[0].coffees)
// })

 
const app = express()
 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Routes 
app.get('/', (req, res) => {
  Shop.findAll({
    include: [Coffee]
  }).then(shops => {
    res.render('index', { shops: shops })
  })
})

app.post('/shops', (req, res) => {
  Shop.create(req.body)
    .then(() => res.redirect('/'))
})

app.post('/coffee/:shop_id', (req, res) => {
  Coffee.create({...req.body, shopId: req.params.shop_id })
    .then(() => res.redirect('/'))
})

app.listen(5000, () => console.log(`Listening on port 5000`))