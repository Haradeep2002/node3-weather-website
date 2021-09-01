
const request = require("request")

const forecast = (latitude , longitude ,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b7111a63d7afd76ba66ab67b0284d028&query=${latitude},${longitude}`
    //while using body.features.length is used instead of response.body.features.length
    request({url, json: true},(error,response)=>{
        if (error) {
            callback("cannot connect to weather api")
        } else if (response.body.error) {
            callback("unable to find location")
            //console.log(url)
        } else {
           //console.log(response.body.location.region,response.body.location.country)
           //console.log(`It is currently ${response.body.current.temperature} degrees out.It feels like it is ${response.body.current.feelslike} degrees out`)
            callback(undefined,`It is currently ${response.body.current.temperature} degrees out.It feels like it is ${response.body.current.feelslike} degrees out`)
        }
    })
}

module.exports = forecast