import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../context/WeatherContext';
import dashboardImg from '../../public/assets/dashboard.png';
import { TemperatureChart } from '../components/TemperatureChart';
import type { WeatherData } from '../services/weatherService';

type SavedLocation = {
    name: string;
    city: string;
    weather: WeatherData;
};

const Dashboard = () => {
    const { user } = useAuth();
    const { fetchWeatherData } = useWeather();
    const navigate = useNavigate();

    const [greeting, setGreeting] = useState('');
    const [locations, setLocations] = useState<SavedLocation[]>([]);
    const [newName, setNewName] = useState('');
    const [newCity, setNewCity] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedMetric, setSelectedMetric] = useState('temp');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const hour = new Date().getHours();
        const greet =
            hour < 12 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches';
        setGreeting(greet);

        const stored = localStorage.getItem('userLocations');
        if (stored) {
            const saved = JSON.parse(stored);
            setLocations(saved);
            if (saved.length > 0) setSelectedCity(saved[0].city);
        }
    }, []);

    const handleAddLocation = async () => {
        if (!newName.trim() || !newCity.trim() || locations.length >= 2) return;

        const weather = await fetchWeatherData(newCity.trim());
        if (!weather) return alert('Ciudad no válida');

        const updated = [...locations, { name: newName.trim(), city: newCity.trim(), weather }];
        setLocations(updated);
        localStorage.setItem('userLocations', JSON.stringify(updated));
        setNewCity('');
        setNewName('');
    };

    const handleRemoveLocation = (city: string) => {
        const updated = locations.filter(loc => loc.city !== city);
        setLocations(updated);
        localStorage.setItem('userLocations', JSON.stringify(updated));
        if (selectedCity === city) setSelectedCity('');
    };

    useEffect(() => {
        const loc = locations.find(l => l.city === selectedCity);
        if (!loc) return;

        const hourly = loc.weather.forecast.forecastday[0].hour.map(h => ({
            time: h.time.split(' ')[1],
            value: selectedMetric === 'temp' ? h.temp_c : h.air_quality?.pm10 ?? 0,
        }));
        setChartData(hourly);
    }, [selectedCity, selectedMetric, locations]);

    const getAirLabel = (pm10: number): string => {
        if (pm10 < 20) return 'Muy bajo';
        if (pm10 < 50) return 'Bajo';
        if (pm10 < 100) return 'Moderado';
        if (pm10 < 150) return 'Alto';
        return 'Muy alto';
    };

    if (!user) {
        return (
            <div className="container-fluid py-5 px-3 d-flex flex-column align-items-center bg-light">
                <h2 className="fw-bold text-center mb-3">Mi panel de control</h2>
                <p className="text-center text-muted mb-4 px-2" style={{ maxWidth: '720px' }}>
                    Crea una cuenta gratuita y configura tu panel con los detalles meteorológicos que más te importan.
                </p>
                <ul className="text-start mb-4 px-3" style={{ maxWidth: '720px', width: '100%' }}>
                    <li>Selecciona hasta 2 ubicaciones y personaliza los datos que deseas ver.</li>
                    <li>Compara condiciones clave durante 12 horas o 7 días.</li>
                    <li>Ve el radar de un vistazo para conocer tu ubicación.</li>
                </ul>
                <div className="mb-5 d-flex flex-column flex-md-row align-items-center gap-3 text-center">
                    <button className="btn btn-dark px-4" onClick={() => navigate('/register')}>
                        Crear cuenta
                    </button>
                    <span className="text-muted">
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/login" className="text-decoration-none">Ingresar</a>
                    </span>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <img src={dashboardImg} alt="Panel de control" className="img-fluid" style={{ maxWidth: '700px', width: '100%' }} />
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h4 className="fw-bold mb-4">
                {greeting}, {user.username || user.email?.split('@')[0]}
            </h4>

            <div className="row g-3 mb-4">
                {locations.map((loc, i) => (
                    <div className="col-md-6" key={i}>
                        <div className="card p-3 h-100 shadow-sm">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 className="fw-bold mb-1">{loc.name}</h6>
                                    <p className="text-muted mb-1">{loc.city}</p>
                                </div>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveLocation(loc.city)}>
                                    ✕
                                </button>
                            </div>
                            <h5 className="fw-bold mb-2">
                                Hace {loc.weather.current.temp_c}° y está {loc.weather.current.condition.text}.
                            </h5>
                            <p className="text-muted small">Actualizado a las {loc.weather.current.last_updated}</p>
                            <div className="row text-center mt-3">
                                <div className="col">
                                    <div className="fw-semibold">Humedad</div>
                                    <div>{loc.weather.current.humidity} %</div>
                                </div>
                                <div className="col">
                                    <div className="fw-semibold">Viento</div>
                                    <div>{loc.weather.current.wind_kph} km/h</div>
                                </div>
                                <div className="col">
                                    <div className="fw-semibold">Calidad aire</div>
                                    <div>
                                        {loc.weather.current.air_quality?.pm10
                                            ? `${Math.round(loc.weather.current.air_quality.pm10)} (${getAirLabel(loc.weather.current.air_quality.pm10)})`
                                            : '--'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {locations.length < 2 && (
                    <div className="col-md-6">
                        <div className="card h-100 p-4 text-center shadow-sm">
                            <h6 className="fw-bold">Agregar ubicación</h6>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nombre personalizado"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Ciudad"
                                value={newCity}
                                onChange={e => setNewCity(e.target.value)}
                            />
                            <button className="btn btn-dark w-100" onClick={handleAddLocation}>Guardar ubicación</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="card p-4 mb-4">
                <h5 className="fw-bold">Comparar ubicaciones</h5>
                <div className="d-flex flex-wrap gap-3 mb-3">
                    <select
                        className="form-select w-auto"
                        onChange={e => setSelectedCity(e.target.value)}
                    >
                        <option value="">Selecciona ciudad</option>
                        {locations.map((l, idx) => (
                            <option key={idx} value={l.city}>{l.city}</option>
                        ))}
                    </select>
                    <select
                        className="form-select w-auto"
                        onChange={e => setSelectedMetric(e.target.value)}
                    >
                        <option value="temp">Temperatura</option>
                        <option value="air">Calidad del aire</option>
                    </select>
                </div>

                {chartData.length > 0 ? (
                    <TemperatureChart
                        hourlyData={chartData.map(d => ({ time: d.time, temp: d.value }))}
                    />
                ) : (
                    <div className="bg-light text-center py-5 rounded">
                        <p className="text-muted mb-0">Aquí iría un gráfico de tendencias</p>
                        <small className="text-muted">Ejemplo: temperatura diaria o calidad del aire</small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
