import './WeatherApp.scss'
import search_icon from '../Assets/search.png'
import cloud_icon from '../Assets/cloud.png'
import humidity_icon from '../Assets/humidity.png'
import wind_icon from '../Assets/wind.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import clear_icon from '../Assets/clear.png'
import { useRef, useState } from 'react'
const WeatherApp = () => {
    const [wicon,setWicon]=useState(cloud_icon)
    const [weather,setWeather] = useState({
        humidity : 64,
        wind : 18,
        temp: 24,
        location: 'London'
    })
    let api_key = '7963f2e202b3d61b2663d1f95eccd337';
    const searchRef = useRef(null)

    const search =async () => {
        const inputValue = searchRef.current.value;
        console.log(inputValue);
        if(inputValue===null||inputValue===''){
            return 0
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${api_key}`
        const response = await fetch(url);
        const data =await response.json();
        console.log(data);
        setWeather({
            humidity : data?.main?.humidity,
            wind : data?.wind?.speed,
            temp: data?.main?.temp,
            location: data?.name
        })
        if(data.weather[0].icon==="01d"||data.weather[0].icon==="01n"){
            setWicon(clear_icon)
        }else if(data.weather[0].icon==="02d"||data.weather[0].icon==="02n"){
            setWicon(cloud_icon)
        }else if(data.weather[0].icon==="03d"||data.weather[0].icon==="03n"){
            setWicon(drizzle_icon)
        }else if(data.weather[0].icon==="04d"||data.weather[0].icon==="04n"){
            setWicon(drizzle_icon)
        }else if(data.weather[0].icon==="09d"||data.weather[0].icon==="09n"){
            setWicon(rain_icon)
        }else if(data.weather[0].icon==="10d"||data.weather[0].icon==="10n"){
            setWicon(rain_icon)
        }else if(data.weather[0].icon==="13d"||data.weather[0].icon==="13n"){
            setWicon(snow_icon)
        }else{
            setWicon(clear_icon)
        }
    }

  return (
    <div className='container' >
        <div className="top-bar">
          <input type="text" ref={searchRef} onKeyPress={()=>search()} className="cityInput" placeholder='Search'/>
          <div className="search-icon" onClick={()=>search()}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">
        {weather.temp}°C
        </div>
        <div className="weather-location">{weather.location}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">
                {weather.humidity}%
              </div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">
              {weather.wind}km/h
              </div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default WeatherApp
