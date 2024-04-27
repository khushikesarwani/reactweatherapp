import {useState,useEffect} from 'react';

export default function usegetCityloc() {


const getLoc= async(cityName)=>{
    
    if(cityName.length===0){
        cityName="Gurugram"
    }
    try {
        const geoCoding_url=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${import.meta.env.VITE_OPEN_WEATHER_API}`;
        
        const res=await fetch(geoCoding_url);
        const data=await res.json();
        const {name,lon,lat}=data[0];
        
        if(res.ok){

        const weather_api=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_API}`;
        const response=await fetch(weather_api);
        const weather_data=await response.json();
       
        const forecast_Days=[];
        const forecastData=[];
        while(forecast_Days.length<5){ 
            //to get 5days forecast including today

            const fourDaysForecast=weather_data.list.filter((forecast)=>{
                const forecastDate=new Date(forecast.dt_txt).toLocaleDateString();
               
                if(!forecast_Days.includes(forecastDate)){
                    forecastData.push(forecast);
                  return forecast_Days.push(forecastDate);
                }
               });
        }

   return {
    data:forecastData,
    fulldata:weather_data
}
        }
        
    
       
     }catch(error){
        console.log("some error occurred"+error);
        return [];
    }

};

 return getLoc;

}

