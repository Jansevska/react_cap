import { fetchWeatherApi } from 'openmeteo';
	
const params = {
	"latitude": 20.7702,
	"longitude": -156.2682,
	"hourly": ["wave_height", "wave_direction", "wind_wave_height", "wind_wave_direction", "swell_wave_height", "swell_wave_direction"],
	"length_unit": "imperial"
};
const url = "https://my-server.tld/v1/marine";
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

const hourly = response.hourly()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {

	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		waveHeight: hourly.variables(0)!.valuesArray()!,
		waveDirection: hourly.variables(1)!.valuesArray()!,
		windWaveHeight: hourly.variables(2)!.valuesArray()!,
		windWaveDirection: hourly.variables(3)!.valuesArray()!,
		swellWaveHeight: hourly.variables(4)!.valuesArray()!,
		swellWaveDirection: hourly.variables(5)!.valuesArray()!,
	},

};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	console.log(
		weatherData.hourly.time[i].toISOString(),
		weatherData.hourly.waveHeight[i],
		weatherData.hourly.waveDirection[i],
		weatherData.hourly.windWaveHeight[i],
		weatherData.hourly.windWaveDirection[i],
		weatherData.hourly.swellWaveHeight[i],
		weatherData.hourly.swellWaveDirection[i]
	);
}

export {
	timezone,
	timezoneAbbreviation,
	latitude,
	longitude
}