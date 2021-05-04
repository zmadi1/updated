const request = require('request');

const forecast = (latitude, longitude, callBack) => {

    const url = `http://api.weatherstack.com/current?access_key=9d448a0e55e896f51713880a1c80ced6&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, {body}) => {//i have used the short hand for destructuring in url and body

        // const {body} = response
        if (error) {
            callBack('Unable to connect to weather service provider',undefined)
        } else if (body.error) {
            console.log('Unable to find location',undefined);
            
        } else {

            callBack(undefined,`It is currently ${body.current.temperature} degrees out.There is a ${body.current.precip}% chance of rain`)
        }
    })
}

module.exports = forecast

// forecast('2a8.3a694o',-26.2366,(error,data)=>{
//     console.log('Error',error);
//     console.log('data',data)
// })