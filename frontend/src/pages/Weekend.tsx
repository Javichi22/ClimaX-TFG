import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Weekend = () => {
    const { weatherData } = useWeather();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!weatherData) navigate('/');
    }, [weatherData, navigate]);

    if (!weatherData) return null;

    const { location, forecast } = weatherData;

    const today = new Date();
    const currentWeekend = forecast.forecastday.filter((d: any) => {
        const date = new Date(d.date);
        const diffDays = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 6 && [5, 6, 0].includes(date.getDay());
    });

    const nextWeekend = forecast.forecastday.filter((d: any) => {
        const date = new Date(d.date);
        const diffDays = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays > 6 && [5, 6, 0].includes(date.getDay());
    });

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="container py-4">
            {/* Título */}
            <div className="card shadow-sm p-3 mb-4">
                <h4 className="fw-bold mb-0">
                    Tiempo para el fin de semana <span className="text-muted">- {location.name}, {location.region}</span>
                </h4>
                <small className="text-muted">
                    Hasta {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} CEST
                </small>
            </div>

            {/* Finde actual */}
            <div className="card shadow-sm">
                {currentWeekend.map((day: any, index: number) => {
                    const isExpanded = expandedIndex === index;
                    const date = new Date(day.date);
                    const label = date.toLocaleDateString('es-ES', {
                        weekday: 'short', day: '2-digit', month: 'short'
                    });

                    return (
                        <div key={index} className="border-bottom px-3 py-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div className="fw-bold" style={{ width: 110 }}>{index === 0 ? 'Hoy' : label}</div>
                                <div className="fw-semibold">{day.day.maxtemp_c}° / {day.day.mintemp_c}°</div>
                                <img src={day.day.condition.icon} alt={day.day.condition.text} width={32} />
                                <div className="text-muted flex-grow-1">{day.day.condition.text}</div>
                                <div>💧 {day.day.daily_chance_of_rain}%</div>
                                <div>🌬️ {day.day.maxwind_kph} km/h</div>
                                <button className="btn btn-sm btn-outline-dark" onClick={() => toggleExpand(index)}>
                                    {isExpanded ? '−' : '+'}
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="row mt-4">
                                    {/* Día */}
                                    <div className="col-md-6 border-end text-center">
                                        <h6 className="fw-bold">{label} | Día</h6>
                                        <h1 className="fw-bold">{day.day.maxtemp_c}°</h1>
                                        <p>{day.day.condition.text}</p>
                                        <div className="text-muted small">🌬️ {day.day.maxwind_kph} km/h</div>
                                        <ul className="list-unstyled mt-3">
                                            <li>💧 Humedad: {day.day.avghumidity}%</li>
                                            <li>🔆 UV: {day.day.uv} de 11</li>
                                            <li>🌅 Amanecer: {day.astro.sunrise}</li>
                                            <li>🌇 Atardecer: {day.astro.sunset}</li>
                                        </ul>
                                    </div>

                                    {/* Noche */}
                                    <div className="col-md-6 text-center">
                                        <h6 className="fw-bold">{label} | Noche</h6>
                                        <h1 className="fw-bold">{day.day.mintemp_c}°</h1>
                                        <p>{day.day.daily_will_it_rain ? '🌧️ Posible lluvia' : '🌃 Despejado'}</p>
                                        <div className="text-muted small">🌬️ {day.day.maxwind_kph} km/h</div>
                                        <ul className="list-unstyled mt-3">
                                            <li>🌘 Fase lunar: {day.astro.moon_phase}</li>
                                            <li>🌜 Salida: {day.astro.moonrise}</li>
                                            <li>🌌 Puesta: {day.astro.moonset}</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Próximo fin de semana */}
            {nextWeekend.length > 0 && (
                <>
                    <h6 className="fw-bold text-muted mt-4 px-2">El próximo fin de semana</h6>
                    <div className="card shadow-sm">
                        {nextWeekend.map((day: any, idx: number) => {
                            const date = new Date(day.date);
                            const label = date.toLocaleDateString('es-ES', {
                                weekday: 'short', day: '2-digit', month: 'short'
                            });
                            return (
                                <div key={idx} className="d-flex justify-content-between align-items-center border-bottom px-3 py-3 flex-wrap gap-2">
                                    <div className="fw-bold" style={{ width: 110 }}>{label}</div>
                                    <div className="fw-semibold">{day.day.maxtemp_c}° / {day.day.mintemp_c}°</div>
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} width={32} />
                                    <div className="text-muted flex-grow-1">{day.day.condition.text}</div>
                                    <div>💧 {day.day.daily_chance_of_rain}%</div>
                                    <div>🌬️ {day.day.maxwind_kph} km/h</div>
                                    <button className="btn btn-sm btn-outline-dark" disabled>+</button>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Radar solo si el usuario está autenticado */}
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

export default Weekend;
