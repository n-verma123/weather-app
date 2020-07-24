const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app= express()

const port = process.env.PORT || 3000

//console.log(__dirname)
const publicStatic = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')

const partials = path.join(__dirname,'../templates/partials')

// setup handlebar engine and views locations
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partials)

// static directory to server
app.use(express.static(publicStatic))

app.get('',(req, res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Narendra Verma"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: "About me",
        name: "Narendra Verma"
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: "Help",
        helptext: "All the help is available on weather App",
        name: "Narendra Verma"
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address)  return resError(res,"you must provide address as /weather?address=<address>")
    const address=req.query.address

    geocode(address,(error,{longitude=0,lattitude=0,location}={}) => {
        if (error) return resError(res,error)

        forecast(longitude,lattitude,(error,{temperature,feeltemp,weather,rain}={})=>{
            if (error)  return resError(res,error)
            res.send({
                inputloc:address,
                location,
                longitude,
                lattitude,
                temperature,
                feeltemp,
                weather,
                rain
            })
        })
    })
})

const resError = (res,error) =>{
    return res.send({
        error: error
    })
}

app.get('/help/*', (req, res) =>{
    res.render('errorPage',{
        errCode:999,
        errMessage: "Help Article not found!"
    })
    //res.send('Help not found')
})

app.get('*', (req, res) =>{
    res.render('errorPage',{
        errCode:404,
        errMessage: "Page not found!"
    })
})

app.listen(port, () =>{
    console.log('Server started and port '+port)
})
