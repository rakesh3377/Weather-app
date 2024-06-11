import { useEffect, useState } from 'react'
//images
import clear from './assets/clearsun.jpg';
import cloud from './assets/cloud.jpg';
import drizzle from './assets/drizzle1.jpg';
import humidility from './assets/humidility.jpg';
import rain from './assets/rain.jpg';
import snow from './assets/snow.jpg';
import wind from './assets/wind.jpg';
import { FaSearch } from "react-icons/fa";
import './App.css'


const Weatherdetails=({icon, temp, citys, country, lat, log, humidilityper, windspeed })=>{
  return(
    <>
    <div className='images'>
      <img src={icon} alt='imgae' />
    </div>
    <div className='temp'>{temp}℃</div>
    <div className='citys'>{citys}</div>
    <div className='country'>{country}</div>
    <div className='co-updates'>
      <div>
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>Longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidility} alt='humidility' className='element-img' />
        <div className='data'>
          <div className='huminity-percent'>{humidilityper}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={wind} alt='windspped' className='element-img' />
        <div className='data'>
          <div className='wind-percent'>{windspeed} km/h</div>
          <div className='text'>Wind speed</div>
        </div>
      </div>
    </div>
    </>
  )
}



function App() {
  let api_key = "819d3394a0710d5d161ae395248e6fd6";
  const [text, settext] = useState("chennai");
  const [icon, seticon] = useState (clear)
  const [temp, settemp] = useState (0);
  const [citys, setcitys] = useState ("Chennai");
  const [country, setcountry] = useState("IN");
  const [lat, setlat] = useState(0);
  const [log, setlog] = useState(0);
  const [humidilityper, sethumidilityper] = useState(0);
  const [windspeed, setwindspeed] = useState(0);
  const [notfound, setnotfound] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null)

  const weatherimgmap = {
    "01d": clear,
    "01n": clear,
    "02dd": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow, 
  };

  const search =async()=>{
    setloading(true);
    let url ='https://api.openweathermap.org/data/2.5/weather?q=' + text + '&appid=819d3394a0710d5d161ae395248e6fd6&units=Metric';

    try{
      let res = await fetch(url);
      let data = await res.json();
      if(data.length === 0){
        console.log("enter city");
      }
      if(data.cod === "404"){
        console.log("City not found");
        setnotfound(true);
        setloading(false);
        return;
      }

      sethumidilityper(data.main.humidity);
      setwindspeed(data.wind.speed);
      settemp(data.main.temp);
      setcitys(data.name);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      const weatherimgcode = data.weather[0].icon;
      seticon(weatherimgmap[weatherimgcode] || clear);
      setnotfound(false)


    }
    catch(error){
      console.error("an error accurred:", error.message);
    
    }
    finally{
      setloading(false)
    }
  };

  const enterclick = (e) =>{
    if(e.key === "Enter"){
      search();
    }
  }
  useEffect(function(){
    search();
  }, []);
  return (
    <>
    <div className='container'>
      <div className='input-container'>
        <input type='text' className='citysinput' placeholder='Search Citys' onChange={e =>settext(e.target.value)} value={text} onKeyDown={enterclick}/>
        <div className='search-icon'>
        <FaSearch  onClick={()=>search()}/>
        </div>
      </div>

      {loading &&<div className='loading-msg'>Loading....</div>}
      {error && <div className='error-msg'>{error}</div>}
      {notfound && <div className='notfound'>City not found</div>}

      {!loading && !notfound &&<Weatherdetails icon={icon} temp={temp} citys={citys} country={country} lat={lat} log={log} humidilityper={humidilityper} windspeed={windspeed}/>}

    </div>
    
    </>
  )
}

export default App
