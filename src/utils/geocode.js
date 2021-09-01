
const request = require("request")

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWgzMjJtYXJhIiwiYSI6ImNrc3lzY2FnaTA1cWcyb24wYjB5YTBpbW0ifQ.En34U_beSN5pJlg77vd8HQ'
    //request({url,json:true},(error,{body}={}) => {})
    //while using body.features.length is used instead of response.body.features.length
    request({url:url,json:true},(error,response) => {
        if (error) {
            callback('unable to connect to location')
        } else if (response.body.features.length === 0) {
            callback('unable to find location')
        } else {
            callback(undefined, {
                long : response.body.features[0].center[0],
                lat : response.body.features[0].center[1],
                loc : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
