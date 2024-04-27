import React from 'react'

const Card = ({info}) => {
  const datek=new Date(info?.dt_txt).toDateString();
  return (
    <div className=" border border-sky-100 rounded-md p-3 shadow-lg mb-5 sm:w-48 text-gray-700
    max-md:w-60 max-md:mx-auto  ">
        <h3 className='font-semibold text-center'>{datek}</h3>
        <img src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} alt="img" className='w-full' />
        <p>Temperature: <span>{(info?.main.feels_like-273.15).toFixed(2)} C</span></p>
        <p>Wind: <span>{info?.wind.speed} m/s</span></p>
        <p>Humidity: <span>{info?.main?.humidity}</span></p>
    </div>
  )
}

export default Card