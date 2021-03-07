const request = require('postman-request');

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaW1hbWh1bGFndXIiLCJhIjoiY2tsZ3owanZzMDE1bzJwcWlqZzFoenRydiJ9.rZyDJFwe3r5j4AdSSHpG1w';

    request(
            {
                // url: url, 
                url,
                json: true
            }, 
            // (error, response, body)=>{
            (error, response, body)=>{
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(response.body.error){ 
            callback('Unable to find location, try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;