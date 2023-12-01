import { useState, useEffect } from "react";
import { WeatherWrapper } from "./weather.module"
import { AiOutlineSearch } from "react-icons/ai"
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsFillCloudSunFill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti"
import { RiLoaderFill } from "react-icons/ri"
import axios from "axios"

interface WeatherDataProps{
    name:string,
    main:{
        temp:string,
        humidity:number,
    };
    sys:{
        country:string
    };
    weather:{
        main:string,
        description:string,
    }[];
    wind:{
        speed:number
    };
}

const DiplayWeather = () => {

    const api_key = "c15a56613dcda17df5659a21b7605fd5";
    const api_Endpoint = "https://api.openweathermap.org/data/2.5";

    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

    const [isLoading, setIsLoading] = useState(false)

    const [searchCity, setSearchCity] = useState("")

    const fetchCurrentWeather = async (lat:number, lon:number) => {
        const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`;
        const response = await axios.get(url);
        return response.data;
    };

    const fetchWeatherData = async(city:string) => {
        try{
            const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=imperial`;
            const searchResponse = await axios.get(url);

            const currentWeatherData:WeatherDataProps = searchResponse.data;
            return {currentWeatherData};
        } catch (error) {
            console.error("No Data Found");
            throw error;
        }
    }

    const handleSearch = async () => {
        if (searchCity.trim() === ""){
            return;
        }

        try{
            const { currentWeatherData } = await fetchWeatherData(searchCity);
            setWeatherData(currentWeatherData)
        } catch (error) {
            console.error("No Results Found")
        }
    };

    const iconChanger = (weather:string) => {
        let iconElement: React.ReactNode;
        let iconColor: string;

        switch(weather) {
            case "rain":
            iconElement = <BsFillCloudRainFill/>
            iconColor="#272829";
            break;

            case "clear":
            iconElement = <BsFillSunFill/>
            iconColor="#102C57";
            break;

            case "broken clouds":
            iconElement = <BsCloudyFill/>
            iconColor="#272829";
            break;

            case "few clouds":
            iconElement = <BsFillCloudSunFill/>
            iconColor="#102C57";
            break;

            default:
                iconElement = <TiWeatherPartlySunny />
                iconColor="#7B2869"
        }

    return (
        <span className="icon" style={{color:iconColor}}>
            {iconElement}
        </span>
    )
}

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = (position.coords)
            Promise.all([fetchCurrentWeather(longitude, latitude)]).then(
                ([currentWeather]) => {
                    setWeatherData(currentWeather);
                    setIsLoading(true)
                    console.log(currentWeather)
                }
            );
        });
    }, []);

    return (
        <WeatherWrapper>
                <div className="container">
                    <div className="searchArea">
                        <input type='text' placeholder="Search Location by City Name"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        />

                        <div className="searchCircle">
                            <AiOutlineSearch className="searchIcon" onClick={handleSearch}/>
                        </div>
                    </div>

                    {weatherData && isLoading ?(
                        <>
                        <div className="weatherArea">
                            <h1>{weatherData.name}</h1>
                            <span>{weatherData.sys.country}</span>
                            <div className="icon">
                                {iconChanger(weatherData.weather[0].main)}
                            </div>
                            <h1>{weatherData.main.temp}</h1>
                            <h2>{weatherData.weather[0].description}</h2>
                        </div>
                        <div className="bottomInfoArea">
                            <div className="precipitation">
                                <WiHumidity className="windIcon"/>
                                <div className="windInfo">
                                    <h2>{weatherData.main.humidity}</h2>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="wind">
                                <SiWindicss className="windIcon"/>
                                <div className="windInfo">
                                    <h2>{weatherData.wind.speed} mph</h2>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                        </>
                    ) : (
                        <div className="loading">
                            <RiLoaderFill className="loadingIcon" />
                            <p>Loading</p>
                        </div>
                    )}
                </div>

        </WeatherWrapper>
    )
}

export default DiplayWeather