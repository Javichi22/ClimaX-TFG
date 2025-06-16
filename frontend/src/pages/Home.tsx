import { useEffect, useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { CurrentWeather } from '../components/CurrentWeather';
import { TemperatureChart } from '../components/TemperatureChart';
import { HourlyForecast } from '../components/HourlyForecast';
import { WeeklyForecast } from '../components/WeeklyForecast';
import { ErrorMessage } from '../components/ErrorMessage';

export const Home = () => {
    const { weatherData, error, fetchWeather } = useWeather();
    const [locationFetched, setLocationFetched] = useState(false);

    useEffect(() => {
        if (!weatherData && !locationFetched) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    const city = data.address.city || data.address.town || data.address.village;
                    if (city) {
                        fetchWeather(city);
                        setLocationFetched(true);
                    }
                },
                (err) => {
                    console.error('Error geolocalización:', err);
                }
            );
        }
    }, [fetchWeather, weatherData, locationFetched]);

    return (
        <div className="container mt-4">
            {error && <ErrorMessage message={error} />}

            {weatherData && (
                <>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <CurrentWeather data={weatherData} />
                        </div>
                        <div className="col-md-6">
                            <TemperatureChart
                                hourlyData={weatherData.forecast.forecastday[0].hour.map((hour: any) => ({
                                    time: `${new Date(hour.time).getHours()}h`,
                                    temp: hour.temp_c,
                                }))}
                            />
                        </div>
                    </div>

                    <HourlyForecast hours={weatherData.forecast.forecastday[0].hour} />
                    <WeeklyForecast days={weatherData.forecast.forecastday} />
                </>
            )}
        </div>
    );
};
