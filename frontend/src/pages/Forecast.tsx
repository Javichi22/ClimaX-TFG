import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Forecast = () => {
    const { weatherData, fetchWeatherData } = useWeather();
    const { user } = useAuth();
    const [expandedHour, setExpandedHour] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [attempted, setAttempted] = useState(false); // <- detecta si se intentó cargar algo

    useEffect(() => {
        if (!weatherData && !attempted) {
            setLoading(true);
            setAttempted(true);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        await fetchWeatherData(`${latitude},${longitude}`);
                        setLoading(false);
                    },
                    async () => {
                        await fetchWeatherData('Madrid');
                        setLoading(false);
                    }
                );
            } else {
                fetchWeatherData('Madrid').then(() => setLoading(false));
            }
        }
    }, [weatherData, attempted, fetchWeatherData]);

    const toggleHour = (key: string) => {
        setExpandedHour(expandedHour === key ? null : key);
    };

    // Mientras intenta cargar
    if (loading) {
        return (
            <div className="container py-5 text-center">
                <h5 className="text-muted">Obteniendo tu ubicación...</h5>
            </div>
        );
    }

    // Si ya intentó y no consiguió nada
    if (!weatherData && attempted) {
        return (
            <div className="container py-5 text-center">
                <h5 className="text-muted mb-3">No se pudo cargar el pronóstico.</h5>
                <p className="text-muted">Intenta buscar una ciudad manualmente.</p>
            </div>
        );
    }

    if (!weatherData) return null; // fallback silencioso mientras carga

    const { location, forecast } = weatherData;

    return (
        <div className="container py-4">
            <h4 className="mb-4">
                Tiempo por hora - {location.name}, {location.region}
            </h4>

            {forecast.forecastday.slice(0, 2).map((day, dayIdx) => (
                <Card key={day.date} className="mb-4 shadow-sm">
                    <Card.Header className="fw-bold bg-white">
                        {new Date(day.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Card.Header>

                    {day.hour.map((hourData, hourIdx) => {
                        const key = `${dayIdx}-${hourIdx}`;
                        const time = hourData.time.split(' ')[1];

                        return (
                            <div key={key} className="border-top">
                                <div
                                    className="d-flex justify-content-between align-items-center px-3 py-2"
                                    role="button"
                                    onClick={() => toggleHour(key)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div style={{ width: 60 }}>{time}</div>
                                    <div style={{ width: 60 }}>{hourData.temp_c}°</div>
                                    <div className="d-flex align-items-center gap-2" style={{ minWidth: 140 }}>
                                        <img src={hourData.condition.icon} alt={hourData.condition.text} width={32} />
                                        <small>{hourData.condition.text}</small>
                                    </div>
                                    <div style={{ width: 80 }}>💧 {hourData.chance_of_rain || 0}%</div>
                                    <div style={{ width: 100 }}>{hourData.wind_dir} {hourData.wind_kph} km/h</div>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => toggleHour(key)}
                                    >
                                        {expandedHour === key ? '-' : '+'}
                                    </Button>
                                </div>

                                {expandedHour === key && (
                                    <div className="bg-light px-4 py-3 border-top">
                                        <div className="row text-center">
                                            <div className="col-md-4 mb-2">🌡️ Sensación: <strong>{hourData.feelslike_c}°</strong></div>
                                            <div className="col-md-4 mb-2">💨 Viento: <strong>{hourData.wind_dir} {hourData.wind_kph} km/h</strong></div>
                                            <div className="col-md-4 mb-2">💧 Humedad: <strong>{hourData.humidity}%</strong></div>
                                            <div className="col-md-4 mb-2">🔆 UV: <strong>{hourData.uv} de 11</strong></div>
                                            <div className="col-md-4 mb-2">☁️ Nubosidad: <strong>{hourData.cloud}%</strong></div>
                                            <div className="col-md-4 mb-2">🌧️ Lluvia: <strong>{hourData.precip_mm} mm</strong></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </Card>
            ))}

            {user && (
                <div className="card p-3 shadow-sm">
                    <h6 className="fw-bold mb-2">Radar meteorológico</h6>
                    <iframe
                        title="Radar map"
                        width="100%"
                        height="450"
                        src={`https://embed.windy.com/embed2.html?lat=${location.lat}&lon=${location.lon}&detailLat=${location.lat}&detailLon=${location.lon}&zoom=7&level=surface&overlay=radar&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&metricWind=default&metricTemp=default&radarRange=-1`}
                        frameBorder="0"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default Forecast;
