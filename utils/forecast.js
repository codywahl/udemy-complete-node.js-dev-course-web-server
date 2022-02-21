const request = require('postman-request');
const urlConstants = require('./constants');

const weatherStack = {
    requestBaseUrl: 'http://api.weatherstack.com/',
    currentApiEndpoint: 'current',
    accessKeyKey: 'access_key=',
    accessKeyValue: '882fb7c34586c768136c4fdb6e09da48',
    locationQueryKey: 'query=',
    myLocationValue: '35.648622814620836, 139.73835069275955',
};

const forecast = (latitude, longitude, callback, res) => {
    let curl = weatherStack.requestBaseUrl + weatherStack.currentApiEndpoint + urlConstants.queryMarker
        + weatherStack.accessKeyKey + weatherStack.accessKeyValue + urlConstants.nextParam
        + weatherStack.locationQueryKey + latitude + urlConstants.comma + urlConstants.space + longitude;


    //using object destructuring on the response object to get the response.body only
    // and using a default value on the destructured response.body of empty object
    request({ url: curl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('There was an error when connecting to weather service.', undefined, res);
        }
        else {
            if (body.error) {
                callback('Unable to find location!', undefined, res);
            }
            else {
                //const currentWeather = response.body.current;
                const { temperature: temp, precip: precipitation } = body.current;

                //const location = response.body.location;
                const { name, region, country, localtime } = body.location;

                const weatherForecastAtLocation = {
                    location: name + ', ' + region + ', ' + country,
                    localtime,
                    temp,
                    precipitation,
                }

                callback(undefined, weatherForecastAtLocation, res);
            }
        }
    });
};

module.exports = forecast;