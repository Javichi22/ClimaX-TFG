import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SevenDays = () => {
    const { weatherData } = useWeather();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!weatherData) navigate('/');
    }, [weatherData, navigate]);

    if (!weatherData) return null;

    const { location, forecast } = weatherData;

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="container py-4">
            {/* Cabecera */}
            <div className="card shadow-sm p-3 mb-4">
                <h4 className="fw-bold mb-0">
                    Tiempo para 7 días <span className="text-muted">- {location.name}, {location.region}</span>
                </h4>
                <small className="text-muted">
                    Hasta: {forecast.forecastday[6]?.date}
                </small>
            </div>

            {/* Días */}
            <div className="card shadow-sm">
                {forecast.forecastday.slice(0, 7).map((day, index) => {
                    const isExpanded = expandedIndex === index;
                    const date = new Date(day.date);
                    const dayName = index === 0 ? 'Hoy' : date.toLocaleDateString('es-ES', {
                        weekday: 'short', day: '2-digit', month: 'short'
                    });

                    return (
                        <div key={index} className="border-bottom px-3 py-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div className="fw-bold" style={{ width: 110 }}>{dayName}</div>
                                <div className="fw-semibold">{day.day.maxtemp_c}° / {day.day.mintemp_c}°</div>
                                <img src={day.day.condition.icon} alt={day.day.condition.text} width={32} />
                                <div className="text-muted flex-grow-1">{day.day.condition.text}</div>
                                <div>💧 {day.day.daily_chance_of_rain}%</div>
                                <div>🌬️ {day.day.maxwind_kph} km/h</div>
                                <button
                                    className="btn btn-sm btn-outline-dark"
                                    onClick={() => toggleExpand(index)}
                                >
                                    {isExpanded ? '−' : '+'}
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="row mt-4">
                                    {/* Día */}
                                    <div className="col-md-6 border-end">
                                        <div className="text-center mb-3">
                                            <h6 className="fw-bold">{dayName} | Día</h6>
                                            <h1 className="fw-bold">{day.day.maxtemp_c}°</h1>
                                            <p className="mb-0">{day.day.condition.text}</p>
                                            <div className="text-muted small">🌬️ {day.day.maxwind_kph} km/h</div>
                                        </div>
                                        <ul className="list-unstyled text-center">
                                            <li>💧 Humedad: {day.day.avghumidity}%</li>
                                            <li>🔆 UV: {day.day.uv} de 11</li>
                                            <li>🌅 Amanecer: {day.astro.sunrise}</li>
                                            <li>🌇 Atardecer: {day.astro.sunset}</li>
                                        </ul>
                                    </div>

                                    {/* Noche */}
                                    <div className="col-md-6 text-center">
                                        <div className="mb-3">
                                            <h6 className="fw-bold">{dayName} | Noche</h6>
                                            <h1 className="fw-bold">{day.day.mintemp_c}°</h1>
                                            <p className="mb-0">{day.day.daily_will_it_rain ? '🌧️ Posible lluvia' : '🌃 Despejado'}</p>
                                            <div className="text-muted small">🌬️ {day.day.maxwind_kph} km/h</div>
                                        </div>
                                        <ul className="list-unstyled">
                                            <li>🌘 Fase lunar: {day.astro.moon_phase}</li>
                                            <li>🌜 Salida de la luna: {day.astro.moonrise}</li>
                                            <li>🌌 Puesta de la luna: {day.astro.moonset}</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Radar SOLO si hay sesión iniciada */}
            {user && (
                <div className="card p-3 mt-4 shadow-sm">
                    <h6 className="fw-bold mb-2">Radar meteorológico</h6>
                    <iframe
                        title="Radar"
                        width="100%"
                        height="300"
                        src={`https://embed.windy.com/embed2.html?lat=${location.lat}&lon=${location.lon}&detailLat=${location.lat}&detailLon=${location.lon}&zoom=7&level=surface&overlay=radar&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
                        frameBorder="0"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default SevenDays;
