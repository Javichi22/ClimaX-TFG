import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';

const Today = () => {
    const { weatherData } = useWeather();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!weatherData) navigate('/');
    }, [weatherData, navigate]);

    if (!weatherData) return null;

    const { current, location, forecast } = weatherData;
    const airIndex = Math.round(current.air_quality?.pm10 ?? 0);

    const getAirLevel = (value: number) => {
        if (value < 50) return { label: 'Muy bajo', className: 'text-success' };
        if (value < 100) return { label: 'Bajo', className: 'text-info' };
        if (value < 150) return { label: 'Moderado', className: 'text-warning' };
        if (value < 200) return { label: 'Alto', className: 'text-orange' };
        return { label: 'Muy alto', className: 'text-danger' };
    };

    const air = getAirLevel(airIndex);

    return (
        <div className="container-fluid bg-light py-4">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="bg-primary text-white p-4 rounded shadow-sm mb-3">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="fw-bold">{location.name}, {location.region}</h4>
                                    <h1 className="display-3 fw-bold">{current.temp_c}°</h1>
                                    <p className="fs-4 mb-1">{current.condition.text}</p>
                                    <small>Día 27° • Noche 19°</small>
                                </div>
                                {current.condition.text.toLowerCase().includes('tormenta') && (
                                    <span className="badge bg-warning text-dark px-3 py-2">
                                        ⚠️ AVISO MODERADO POR TORMENTA
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="card p-3 mb-3">
                            <h6 className="fw-bold">Detalles actuales</h6>
                            <div className="row text-center text-md-start mt-3">
                                <div className="col-6 col-md-3 mb-2">💧 Humedad: <strong>{current.humidity}%</strong></div>
                                <div className="col-6 col-md-3 mb-2">🌬️ Viento: <strong>{current.wind_kph} km/h {current.wind_dir}</strong></div>
                                <div className="col-6 col-md-3 mb-2">📊 Presión: <strong>{current.pressure_mb} mb</strong></div>
                                <div className="col-6 col-md-3 mb-2">🕒 Última act.: <strong>{current.last_updated}</strong></div>
                            </div>
                        </div>

                        <div className="card p-3 mb-3">
                            <h6 className="fw-bold">Pronóstico por horas (hoy)</h6>
                            <div className="d-flex gap-2 overflow-auto py-2">
                                {forecast.forecastday[0].hour.map((hour, idx) => (
                                    <div key={idx} className="text-center border rounded p-2 shadow-sm" style={{ minWidth: 70 }}>
                                        <small className="fw-semibold">{hour.time.split(' ')[1]}</small>
                                        <img src={hour.condition.icon} alt={hour.condition.text} width={36} />
                                        <div className="fw-bold">{hour.temp_c}°</div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-end pt-2">
                                <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/forecast')}>
                                    Ver más por hora
                                </button>
                            </div>
                        </div>

                        <div className="card p-3 mb-3">
                            <h6 className="fw-bold">Pronóstico diario</h6>
                            {forecast.forecastday.slice(0, 3).map((day, idx) => (
                                <div key={idx} className="d-flex justify-content-between align-items-center border-bottom py-2">
                                    <div className="fw-bold" style={{ width: 120 }}>
                                        {idx === 0 ? 'Hoy' : new Date(day.date).toLocaleDateString('es-ES', {
                                            weekday: 'long', day: '2-digit', month: 'short'
                                        })}
                                    </div>
                                    <div>{day.day.condition.text}</div>
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} width={32} />
                                    <div className="fw-semibold">{day.day.maxtemp_c}° / {day.day.mintemp_c}°</div>
                                </div>
                            ))}
                            <div className="text-end pt-2">
                                <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/7dias')}>
                                    Próximos 7 días
                                </button>
                            </div>
                        </div>

                        {user && (
                            <div className="card p-3">
                                <h6 className="fw-bold">Radar meteorológico</h6>
                                <iframe
                                    title="Radar map"
                                    width="100%"
                                    height="300"
                                    src={`https://embed.windy.com/embed2.html?lat=${location.lat}&lon=${location.lon}&detailLat=${location.lat}&detailLon=${location.lon}&zoom=7&level=surface&overlay=radar&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
                                    frameBorder="0"
                                ></iframe>
                            </div>
                        )}
                    </div>

                    <div className="col-lg-4">
                        {current.air_quality && (
                            <div className="card shadow-sm mb-4 p-3">
                                <h6 className="fw-bold">ÍNDICE DE CALIDAD DEL AIRE</h6>
                                <div className={`display-4 fw-bold ${air.className}`}>{airIndex}</div>
                                <p className="mb-1">{air.label}</p>
                                <small>Puede causar molestias leves en personas sensibles.</small>
                                <button className="btn btn-outline-dark btn-sm mt-2" onClick={() => navigate('/aire')}>
                                    Ver detalles
                                </button>
                            </div>
                        )}

                        <div className="card shadow-sm p-3">
                            <h6 className="fw-bold">Actividades y Salud</h6>
                            <p className="mb-1">Pronóstico de alergias estacionales y recuento de polen</p>
                            <small className="text-muted">No se detectó polen en tu área.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Today;
