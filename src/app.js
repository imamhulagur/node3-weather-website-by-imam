const express = require('express')
const path = require('path')
const  hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//create server
const app = express()

//heroku port config
const port = process.env.PORT || 3000;

//To provide location of current working directory/folder name
console.log(__dirname)

//To provide location of current working filename name
// console.log(__filename);

//manipulate and produce required path using path
// console.log(path.join(__dirname, '../public'))
publicDirectoryPath = path.join(__dirname, '../public')

//setup custom path for views folder
const viewPath  = path.join(__dirname, '../templates/views')

// to tell express where to look for views folder which we have renamed
// app.set('views', path.join(__dirname, '../views'));

// to tell express where to look for views folder which we have renamed
app.set('views', viewPath)

//setup custom path for partials
const partialsPath = path.join(__dirname, '../templates/partials')

//to tell express which template engine we have installed
app.set('view engine', 'hbs')

//register partials using hbs
hbs.registerPartials(partialsPath)

//app.use()->the way to customize server
//static() take the path we want to serve
app.use(express.static(publicDirectoryPath))

//index page setup
app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Imam Hulagur'
    })
})

//about page setup
app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Imam Hulagur'
    })
})

//help page setup
app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Imam Hulagur',
        helpText: 'Thanks for visiting. Please visit nodejs.com for more info'
    })
})

//this method will configure what should app do when an someone tries tp request at a specific url, mey be we should sending back html or json.
//1st arg-> route parameter, 2nd->call back fun(req, res)
// app.get('', (req, res)=> {
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'imam',
//     },
//     {
//         name: 'imam1'
//     }]);
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>');
// })

// app.get('/weather', (req, res)=>{
//     res.send({
//         forecast : 'It is snowing',
//         location: 'Jammu and kashmir'
//     });
// })

//implemented for query string demo
app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error) {
            return res.send(
                {
                    // error: error
                    error//ES6 shorthand
                }
            )
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                // location: location,
                location,
                address: req.query.address
            })

        })

    })
    // res.send({
    //     forecast : 'It is snowing',
    //     location: 'Jammu and kashmir',
    //     address: req.query.address
    // });
})

app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    // res.send('Help article not found')
    res.render('404',{
        title: '404',
        name: 'imam hulagur',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    // res.send('My 404 page');
    res.render('404',{
        title: '404',
        name: 'imam hulagur',
        errorMessage: 'Page not found'
    })
})

//to start server up app.listen(specify port, callback()), 3000 common development port
// app.listen(3000, ()=>{
app.listen(port, ()=>{
    // console.log('server is up and running on port 3000')
    console.log('server is up and running on port '+port)
})

//visit localhost:3000 to view the message.