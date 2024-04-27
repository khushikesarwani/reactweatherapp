import React, { useEffect, useState,useRef } from 'react';
import Card from '../components/Card';
import usegetCityloc from '../Hooks/useGetCityloc';



const Homepage = () => {
  const getLoc=usegetCityloc();
    const city =useRef();
    const [cityName,setCityName]=useState("gurugram");
    const [response,setResponse]=useState([]);
    const [full,setFull]=useState();
    const [positionk,setPosition]=useState({});

// const handleUserLocation=()=>{}
   const handleUserLocation=async()=>{

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });


    const REVERSE_geocoding_api=`http://api.openweathermap.org/geo/1.0/reverse?lat=${positionk.lat}&lon=${positionk.lon}&limit=1&appid=${import.meta.env.VITE_OPEN_WEATHER_API}`;
    
     const res=await fetch(REVERSE_geocoding_api);
     const data=await res.json();
        var {name}=data[0];
        setCityName(name);
   

    }else{}
  
          
    }


const handleSubmit=async(e)=>{
      e.preventDefault();
    setCityName(city.current.value);
        city.current.value="";
     }

     useEffect(()=>{

      const p=async()=>{
         const result=await getLoc(cityName);
         setResponse(result.data);
         setFull(result.fulldata);
       }
     p();
     //eslint-disable-next-line
     },[cityName]);

  return (

    <div className="flex text-white h-screen justify-center items-center max-md:flex-col max-md:justify-between">
        <div className="lside w-[35%] h-screen flex flex-col justify-center items-center
         max-md:w-full max-md:py-5 max-md:mt-[4rem]  ">

           <div className="mx-auto w-[80%] ">
           <h2 className="font-semibold text-[2rem] text-center text-gray-700">Enter City</h2>
        <form className="w-full mt-4 text-gray-700" onSubmit={handleSubmit}>
            <input type="text"  className="mx-auto w-full py-2 px-2 shadow-md outline-none border-2"
            ref={city}
             placeholder="Chicago" />
             <button type="submit" className="w-full my-3 btn  py-1 rounded-md text-white
             hover:btnhover
            ">
             Search</button>
        </form>
         <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 "></hr>
         <button className=" w-full btn  font-semibold rounded p-1 shadow-md"
          onClick={handleUserLocation}>
        
  <span className="flex w-full bg-white hover:bgtransparent hover:text-white text-gray-700 rounded p-1 justify-center ">
  Use current location
     </span>
</button>
</div>
</div>

        <div className="rside flex flex-col justify-around items-start h-screen w-[65%] text-gray-700
         max-md:w-full max-md:py-5 max-md:mt-[2rem]  ">
           <div className=" flex justify-between mx-auto px-3 py-3 w-[90%] border rounded-md shadow-lg h-52 ">
           <div  className="flex flex-col gap-2 justify-center">
             <h2 className=" font-semibold text-[2rem] ">{full?.city.name}</h2>
             <p>Tempertaure: <span>{(response[0]?.main?.feels_like-273.15).toFixed(2)} C</span></p>
             <p>wind: <span>{response[0]?.wind.speed} m/s</span> </p>
             <p>Humidity: <span>{response[0]?.main?.humidity}</span></p>
             </div>
             <div>
             <img src={`http://openweathermap.org/img/wn/${response[0]?.weather[0].icon}@2x.png`} alt="img"
             className='w-full h-full'  />
            
             </div>
           </div>
           <div className="cards flex justify-between flex-wrap w-[90%]  mx-auto h-48 ">
         {  response.map((res,index)=>{
            if(index!=0 && index!=5) {
              return <Card info={res} />;
            } 
           })}
           </div>
        </div>
    </div>
  )
}

export default Homepage;