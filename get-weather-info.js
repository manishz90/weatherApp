//const yargs = require("yargs");
const axios = require("axios");

//const argv = yargs
//.options({
//  a: {
//    demand: true,
//    alias: 'address',
//    describe: 'Address for weather-app',
//    string: true
//  }
//})
//.help()
//.alias('help', 'h')
//.argv;


function getWeatherInfo (address) {
    
    
    var promise = new Promise((resolve, reject) => {
        
        console.log(address);

        var geocodeURL ='https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAED7hugOPK3I9Zi_ygU24uoa9f-mpyrMw&address=' + encodeURIComponent(address);

        var output = {};

        axios.get(geocodeURL).then((response) => {
          if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
          }
        //  console.log(response.data.results[0].formatted_address);
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;

        output.lat = lat;
        output.lng = lng;
        output.formattedAddress = response.data.results[0].formatted_address;
        var weatherURL = 'https://api.darksky.net/forecast/fb22c011e733f8ceb47c186fc5010f8d/' + lat + ',' + lng;

        return axios.get(weatherURL);

        }).then((response) => {
          var temp = response.data.currently.temperature;
          var apparentTemperature = response.data.currently.apparentTemperature;

          //console.log(`It is currently ${temp}. It feels like ${apparentTemperature}`);
          output.temp = temp;
          output.apparentTemperature = apparentTemperature;
          resolve(output);
          return output;

        }).catch((e) => {
            output.message = 'Could not get details.';
            reject(output);
            //return output;
        });    
     
    });
    return promise;    
}

module.exports = {
    getWeatherInfo: getWeatherInfo
}
