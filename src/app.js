const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000


const publicFolderPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicFolderPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Haradeep Mara'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About me',
        name : 'Haradeep Mara'
    })
})

app.get('/help',(req,res) => {
    res.render('Help',{
        helpText : 'this might not help you',
        title:'help',
        name:'Haradeep Mara'
    })
})

app.get('/weather',(req,res) => {
    const address = req.query.address
    if(!address) return res.send({
        error:"address field is mandatory"
    })
    geoCode(address,(error,data) => {
        if(error)
            return res.send({error})
        forecast(data.lat, data.long, (err,forecastdata) => {
            if(err) 
                return res.send({err})
            res.send({
                location : address,
                forecast : forecastdata,
                address : data.loc
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'haradeep',
        errmsg:'404 error'
    })
})

app.listen(port,() => {
    console.log("Server is up and running on port"+port)
})