const request = require('postman-request');
const urlConstants = require('./constants');

const mapBox = {
    requestBaseUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    losAngeles: 'Los' + urlConstants.space + 'Angeles',
    addressJson: '.json',
    access_tokenKey: 'access_token=',
    access_tokenValue: 'pk.eyJ1IjoiY29keXdhaGwiLCJhIjoiY2t6cWh5anIyNmo2ZTJ3bmZuaG1pcHZrNiJ9.hhvWDdXCAyUVR1CaXNXWTA',
    limitKey: 'limit=',
    limitValue1: '1',
    errorNotAuthorized: 'Not Authorized - No Token',
    errorNotFound: 'Not Found',

};

const geocode = (address, callback, res) => {
    const encodedAddress = encodeURIComponent(address);

    const curl = mapBox.requestBaseUrl + encodedAddress + mapBox.addressJson
        + urlConstants.queryMarker + mapBox.access_tokenKey + mapBox.access_tokenValue
        + urlConstants.nextParam + mapBox.limitKey + mapBox.limitValue1;

    //using object destructuring on the response object to get the response.body only
    // and using a default value on the destructured response.body of empty object
    request({ url: curl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined, res);
        }
        else if (body.message) {
            if (body.message === mapBox.errorNotAuthorized) {
                callback('Authorization error', undefined, res);
            }
            else if (body.message === mapBox.errorNotFound) {
                callback('Unable to find location. Try another search.', undefined, res);
            }
            else {
                callback('Unknown error with MapBox location services.', undefined, res);
            }
        }
        else if (!body.features || !body.features[0]) {
            callback('Unable to find location. Try another search.', undefined, res);
        }
        else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            },
                res);
        }
    });
};

module.exports = geocode;