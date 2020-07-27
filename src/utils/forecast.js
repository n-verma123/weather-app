const request=require("request")

const forecast=(lattitude, longitude, callback)=>{
    if (lattitude===0 || longitude.length===0){
          callback("Lattitude/Longitude should be blank", undefined)
    }else{
        const url='http://api.weatherstack.com/forecast?access_key=24c8791c89c054d34e8af3fe8e45ac2f'
        const finalUrl=url+'&query='+lattitude+','+longitude //+'&units=f'
        request({url:finalUrl, json:true}, (error, {body})=>{
            //console.log(finalUrl);
            //console.log(response.body);
            if (error){  
                callback('You are not connected to Internet',undefined)
            }else if(body.error){
                callback('Unable to find location',undefined)
            }else{
                const fcast={
                    location:body.location.name,
                    country:body.location.country,
                    datetime:body.location.localtime,
                    temperature: body.current.temperature,
                    weather: body.current.weather_descriptions[0],
                    rain: body.current.precip,
                    feeltemp:body.current.feelslike,
                    humidity: body.current.humidity,
                    //mintemp: body.forecast[0].mintemp,
                    //  maxtemp: body.forecast[0].maxtemp
                }

                console.log(fcast)
                callback(undefined,fcast)
            }
        })
    }
}

module.exports = forecast