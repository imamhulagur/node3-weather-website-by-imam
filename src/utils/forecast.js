const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=500202960a4016659e6ac115053018b4&query='+latitude+','+longitude+',-122.4233&units=f';
    request(
        {
            // url: url,
            url,
            json: true            
        }, function (error, response) {
            if(error){
                callback('Unable to connect to location services!', undefined)
            } else if(response.body.error) {
                callback('Unable to find location, try another search!', undefined)
            } else {
                callback(undefined, response.body.current.weather_descriptions[0]+'. It is currently '+ response.body.current.temperature+' degrees out. It is feels like '+response.body.current.feelslike+' degrees out.');
            }
});
}

module.exports = forecast;