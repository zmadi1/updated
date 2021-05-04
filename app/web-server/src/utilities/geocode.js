const request = require('request');

const geocode = (address,callBack)=>{
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiemFraGVsZW1hZGkiLCJhIjoiY2tqYWpzN2NxMDJqZTJ0azFkdWYwMmszaSJ9.YePKa_ovquEgRK9TVQBR3g&limit=1`;

    request({url,json:true},(error,{body})=>{//i have used the short hand for destructuring in url and body

        if(error){
            callBack('Unable to connect to location services',undefined);
        }else if(body.features.length === 0){
            callBack('Unable to find location . Try another search',undefined)
        }else{
            callBack(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            });
        };

    });
}


module.exports =geocode;