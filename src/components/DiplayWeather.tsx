import { useState, useEffect } from "react";
import { WeatherWrapper } from "./weather.module"
import { AiOutlineSearch } from "react-icons/ai"
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
// import 113 from "../assets/64x64/day"
import axios from "axios"

interface WeatherDataProps {
    location: {
        name: string,
        region: string,
        country: string
    },
    current: {
        temp_f: number,
        condition: {
            text: string,
            icon: string,
        },
        wind_mph: number,
        wind_dir: string,
        humidity: number,
        gust_mph: number
    }
}

const DiplayWeather = () => {

    const api_key = "694fcda006794a1f9a5194313230410";
    const api_Endpoint = "http://api.weatherapi.com/";

    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

    const [searchCity, setSearchCity] = useState("")

    const fetchCurrentWeather = async () => {
        const url = `${api_Endpoint}v1/current.json?key=${api_key}&q=auto:ip`;
        const response = await axios.get(url);
        return response.data;
    };

    const fetchWeatherData = async (city: string) => {
        try {
            const url = `${api_Endpoint}v1/current.json?key=${api_key}&q=${city}`;
            const searchResponse = await axios.get(url);
            console.log(fetchWeatherData)

            const currentWeatherData: WeatherDataProps = searchResponse.data;
            return { currentWeatherData };
        } catch (error) {
            console.error("No Data Found");
            throw error;
        }
    }

    const handleSearch = async () => {
        if (searchCity.trim() === "") {
            return;
        }

        try {
            const { currentWeatherData } = await fetchWeatherData(searchCity);
            setWeatherData(currentWeatherData)
        } catch (error) {
            console.error("No Results Found")
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(() => {
            Promise.all([fetchCurrentWeather()]).then(
                ([currentWeather]) => {
                    setWeatherData(currentWeather);
                    console.log(currentWeather)
                }
            );
        });
    }, []);

    // const iconChanger = (weather: string) => {
    //     let iconElement: 

    //     switch (weather) {
    //         case "Rain":
    //             iconElement = 
    //             break;

    //         case "Clear":
    //             iconElement = 133
    //             break;

    //         case "Clouds":
    //             iconElement = 
    //             break;

    //         default:
    //     }

        return (
            <WeatherWrapper>
                <div className="container">
                    <div className="searchArea">
                        <input type='text' placeholder="Search Location by City Name"
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                        />

                        <div className="searchCircle">
                            <AiOutlineSearch className="searchIcon" onClick={handleSearch} />
                        </div>
                    </div>

                    {weatherData && (
                        <>
                            <div className="weatherArea">
                                <h1>{weatherData.location.name}</h1>
                                <span>{weatherData.location.region} | {weatherData.location.country}</span>
                                <div className="icon">
                                {/* {iconChanger(weatherData.current.condition.text)} */}
                                </div>
                                <h1>{weatherData.current.temp_f}</h1>
                                <h2>{weatherData.current.condition.text}</h2>
                            </div>
                            <div className="bottomInfoArea">
                                <div className="precipitation">
                                    <WiHumidity className="windIcon" />
                                    <div className="windInfo">
                                        <h2>{weatherData.current.humidity}</h2>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                                <div className="wind">
                                    <SiWindicss className="windIcon" />
                                    <div className="windInfo">
                                        <h2>{weatherData.current.wind_mph} mph</h2>
                                        <p>Wind Speed</p>
                                    </div>
                                </div>
                                <div className="wind">
                                    <SiWindicss className="windIcon" />
                                    <div className="windInfo">
                                        <h2>{weatherData.current.gust_mph} mph</h2>
                                        <p>Wind Gusts</p>
                                    </div>
                                </div>
                                <div className="wind">
                                    <SiWindicss className="windIcon" />
                                    <div className="windInfo">
                                        <h2>{weatherData.current.wind_dir}</h2>
                                        <p>Wind Direction</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </WeatherWrapper>
        )
    }

    export default DiplayWeather