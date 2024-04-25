import { Usesignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";

const cities = [
    { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
    { name: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
    { name: "Valencia", latitude: 39.4699, longitude: -0.3763 },
    { name: "Seville", latitude: 37.3891, longitude: -5.9845 },
];

type Datos = {
    time: string;
    cloud_over: number;
    relative_humidity_2m: number;
    temperature_2m: number;
    wind_direction_10m: number;
    wind_speed_10m: number;
    rain: number;
};

const Weather = () => {
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [showTemperature, setShowTemperature] = useState(true);
    const [showRelativeHumidity, setShowRelativeHumidity] = useState(true);
    const [showRain, setShowRain] = useState(true);
    const [showWindSpeed, setShowWindSpeed] = useState(true);
    const [showWindDirection, setShowWindDirection] = useState(true);
    const [showTime, setShowTime] = useState(true);
    const [showCloudOver, setShowCloudOver] = useState(true);
    const [datos, setDatos] = useState<Datos>();

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m`
            );
            const data = await response.json();
            const datostiempo: Datos = {
                time: data.current.time,
                cloud_over: data.current.cloud_over,
                relative_humidity_2m: data.current.relative_humidity_2m,
                temperature_2m: data.current.temperature_2m,
                wind_direction_10m: data.current.wind_direction_10m,
                wind_speed_10m: data.current.wind_speed_10m,
                rain: data.current.rain,
            };
            setDatos(datostiempo);
        };
        fetchWeatherData();
    }, [selectedCity]);

    return (
        <div>
            <h1>Weather App</h1>
            <select
                value={selectedCity.name}
                onChange={(e) => {
                    const city = cities.find((c) => c.name === e.target.value);
                    setSelectedCity(city);
                }}
            >
                {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </select>
            <div>
                <button onClick={() => setShowTemperature(!showTemperature)}>
                    {showTemperature ? 'Hide Temperature' : 'Show Temperature'}
                </button>
                <button onClick={() => setShowRelativeHumidity(!showRelativeHumidity)}>
                    {showRelativeHumidity ? 'Hide Relative Humidity' : 'Show Relative Humidity'}
                </button>
                <button onClick={() => setShowRain(!showRain)}>
                    {showRain ? 'Hide Rain' : 'Show Rain'}
                </button>
                <button onClick={() => setShowWindSpeed(!showWindSpeed)}>
                    {showWindSpeed ? 'Hide Wind Speed' : 'Show Wind Speed'}
                </button>
                <button onClick={() => setShowWindDirection(!showWindDirection)}>
                    {showWindDirection ? 'Hide Wind Direction' : 'Show Wind Direction'}
                </button>
                <button onClick={() => setShowTime(!showTime)}>
                    {showTime ? 'Hide Time' : 'Show Time'}
                </button>
                <button onClick={() => setShowCloudOver(!showCloudOver)}>
                    {showCloudOver ? 'Hide Cloud Over' : 'Show Cloud Over'}
                </button>
            </div>
            <div>
                {showTemperature && <p>{datos && datos.temperature_2m}</p>}
                {showRelativeHumidity && <p>{datos && datos.relative_humidity_2m}</p>}
                {showRain && <p>{datos && datos.rain}</p>}
                {showWindSpeed && <p>{datos && datos.wind_speed_10m}</p>}
                {showWindDirection && <p>{datos && datos.wind_direction_10m}</p>}
                {showTime && <p>{datos && datos.time}</p>}
                {showCloudOver && <p>{datos && datos.cloud_over}</p>}
            </div>
        </div>
    );
};

export default Weather;
