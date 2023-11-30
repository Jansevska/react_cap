import { fetchWeatherApi } from 'openmeteo';
	
const params = {
	"latitude": 20.7702,
	"longitude": -156.2682,
	"current": ["temperature_2m", "is_day", "precipitation", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
	"hourly": ["temperature_2m", "precipitation", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
	"daily": ["sunrise", "sunset"],
	"temperature_unit": "fahrenheit",
	"wind_speed_unit": "mph",
	"precipitation_unit": "inch",
	"timezone": "auto",
	"models": "best_match"
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);


// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature2m: current.variables(0)!.value(),
		isDay: current.variables(1)!.value(),
		precipitation: current.variables(2)!.value(),
		windSpeed10m: current.variables(3)!.value(),
		windDirection10m: current.variables(4)!.value(),
		windGusts10m: current.variables(5)!.value(),
	},
	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
		precipitation: hourly.variables(1)!.valuesArray()!,
		windSpeed10m: hourly.variables(2)!.valuesArray()!,
		windDirection10m: hourly.variables(3)!.valuesArray()!,
		windGusts10m: hourly.variables(4)!.valuesArray()!,
	},
	daily: {
		time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		sunrise: daily.variables(0)!.valuesArray()!,
		sunset: daily.variables(1)!.valuesArray()!,
	},

};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	console.log(
		weatherData.hourly.time[i].toISOString(),
		weatherData.hourly.temperature2m[i],
		weatherData.hourly.precipitation[i],
		weatherData.hourly.windSpeed10m[i],
		weatherData.hourly.windDirection10m[i],
		weatherData.hourly.windGusts10m[i]
	);
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
	console.log(
		weatherData.daily.time[i].toISOString(),
		weatherData.daily.sunrise[i],
		weatherData.daily.sunset[i]
	);
}

export {
    timezone,
    timezoneAbbreviation,
    latitude,
    longitude
}