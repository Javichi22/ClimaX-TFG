import { useEffect, useState } from 'react';
import { getMonthlyView, type CalendarDay } from '../services/weatherService';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../context/WeatherContext';
import '../../styles/Monthly.css';

const MonthlyForecast = () => {
    const { user } = useAuth();
    const { weatherData } = useWeather();
    const [data, setData] = useState<CalendarDay[]>([]);
    const [selected, setSelected] = useState<CalendarDay | null>(null);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    useEffect(() => {
        getMonthlyView('Madrid').then(setData);
    }, []);

    const getCalendarGrid = () => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const start = new Date(firstDay);
        start.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7));

        const cells = [];

        for (let i = 0; i < 6 * 7; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            const isoDate = currentDate.toISOString().split('T')[0];
            const entry = data.find(d => d.date === isoDate);

            cells.push(
                <div
                    key={i}
                    className={`calendar-cell ${currentDate.getMonth() !== currentMonth ? 'disabled' : ''}`}
                    onClick={() => entry && setSelected(entry)}
                >
                    <div className="calendar-day-number">{currentDate.getDate()}</div>
                    {entry ? (
                        <>
                            <img src={entry.icon} alt={entry.condition} width={30} />
                            <div className="calendar-temp">{entry.max}° / {entry.min}°</div>
                            <small className="text-muted">{entry.condition}</small>
                        </>
                    ) : (
                        <div className="calendar-avg">Promedio</div>
                    )}
                </div>
            );
        }

        return cells;
    };

    return (
        <div className="container my-4">
            <div className="card shadow-sm p-3 mb-4">
                <h4 className="fw-bold">
                    Pronóstico mensual - {today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    {weatherData?.location?.name && (
                        <span className="text-muted"> – {weatherData.location.name}, {weatherData.location.region}</span>
                    )}
                </h4>
                <small className="text-muted">
                    Actualizado: {today.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} CEST
                </small>
            </div>

            <div className="calendar-grid calendar-header">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d, idx) => (
                    <div key={idx} className="calendar-cell header">{d}</div>
                ))}
            </div>

            <div className="calendar-grid">{getCalendarGrid()}</div>

            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="fw-bold mb-0">
                                {new Date(selected.date).toLocaleDateString('es-ES', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short'
                                })}{' '}| Día
                            </h6>
                            <button className="btn-close" onClick={() => setSelected(null)}></button>
                        </div>

                        <div className="row">
                            <div className="col-md-6 border-end text-center">
                                <h3>{selected.max}°</h3>
                                <p>{selected.condition}</p>
                                <div>🌅 Amanecer: {selected.sunrise}</div>
                                <div>🌇 Atardecer: {selected.sunset}</div>
                            </div>
                            <div className="col-md-6 text-center">
                                <h3>{selected.min}°</h3>
                                <p>🌧️ Posible lluvia</p>
                                <div>🌙 Salida de Luna: {selected.moonrise}</div>
                                <div>🌌 Puesta: {selected.moonset}</div>
                                <div>🌗 Fase lunar: {selected.moon_phase}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {user && (
                <div className="card shadow-sm p-3 mt-4">
                    <h6 className="fw-bold">Radar meteorológico</h6>
                    <iframe
                        title="Radar"
                        width="100%"
                        height="300"
                        src={`https://embed.windy.com/embed2.html?lat=40.4168&lon=-3.7038&detailLat=40.4168&detailLon=-3.7038&zoom=7&level=surface&overlay=radar&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
                        frameBorder="0"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MonthlyForecast;
