const request=require("request")

const geocode= (address, callback) =>{
    if (address.length===0){
        callback('Address is empty',undefined)
    }else{
        const base_uri="https://api.mapbox.com/geocoding/v5/mapbox.places/";
        const accessKey="pk.eyJ1IjoibnZyZXJtYTEyMyIsImEiOiJja2N1ZWJwYWwyMzlrMnpta2d3cTlzN2NuIn0.D2uludYkONyiJH6dQ-WHvQ";
        const optParam="&limit=3"
        const url=base_uri+encodeURIComponent(address)+".json?access_token="+accessKey+optParam;
      
        //console.log(finalurl)
        request({url, json:true}, (error,{body}={})=>{
            //console.log(response.body);
            if (error){
                callback('You are not connected to Internet',undefined) 
            }else if(body.features === undefined){
                callback(error,body)
            }else if(body.features.length<1){
                callback('Address ['+address+'] Not found, Try with another one', undefined) 
            }else{
                console.log("Congratulation Address found")
                const gLocation={
                    location: body.features[0].place_name,
                    lattitude: body.features[0].center[0],
                    longitude: body.features[0].center[1]
                }
                callback(error,gLocation);
            }
        })
    }
}

module.exports = geocode

// module.exports = {
//     geoCode:geoCode,
//     forecast:forecast
// }