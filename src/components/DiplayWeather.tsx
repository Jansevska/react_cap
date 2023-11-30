import { useEffect } from "react";
import axios from "axios"
import { WeatherWrapper } from "./weather.module"
import { AiOutlineSearch } from "react-icons/ai"
import { BsCloudRain } from "react-icons/bs";
import { SiWindicss } from "react-icons/si";
// import { latitude, longitude } from "../lib/marineWeather";
// import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsFillCloudSunFill } from "react-icons/bs";
// import { TiWeatherPartlySunny } from "react-icons/ti"
// import { RiLoaderFill } from "react-icons/ri"



export default function DiplayWeather() {

    const api_key = "c6ac45ddf80c24f123c681782893bb7a";
    const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

    const fetchCurrentWeather = async (lat:number, lon:number) => {
        const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`
        const response = await axios.get(url);
        return response.data;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = (position.coords)
            Promise.all([fetchCurrentWeather(longitude, latitude)]).then(
                ([currentWeather]) => {
                    console.log(currentWeather)
                }
            )
        })
    }, []);

    return (
        <WeatherWrapper>
                <div className="container">
                    <div className="searchArea">
                        <input type='text' placeholder="Search Location by City Name"/>
                    <div className="searchCircle">
                    <AiOutlineSearch className="searchIcon"/>
                    </div>
                    </div>
                    <div className="weatherArea">
                        <h1>Kahului</h1>
                        <span>HI</span>
                        <div className="icon">
                            icon
                        </div>
                        <h1>82 f</h1>
                        <h2>Sunny</h2>
                    </div>
                    <div className="bottomInfoArea">
                        <div className="precipitation">
                            <BsCloudRain className="windIcon"/>
                            <div className="windInfo">
                                <h2>60%</h2>
                                <p>Chance of Rain</p>
                            </div>
                        </div>
                        <div className="wind">
                            <SiWindicss className="windIcon"/>
                            <div className="windInfo">
                                <h2>22 mph</h2>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
        </WeatherWrapper>
    )
}