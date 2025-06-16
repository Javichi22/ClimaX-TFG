import { useWeather } from '../context/WeatherContext';

const AirQuality = () => {
    const { weatherData } = useWeather();

    if (!weatherData || !weatherData.current.air_quality) {
        return <p className="text-center mt-5">Cargando calidad del aire...</p>;
    }

    const air = weatherData.current.air_quality;

    const qualityIndex = Math.round(air.pm10);
    const nivel =
        qualityIndex < 50 ? 'Muy bajo' :
            qualityIndex < 100 ? 'Bajo' :
                qualityIndex < 150 ? 'Moderado' :
                    qualityIndex < 200 ? 'Alto' : 'Muy alto';

    const nivelColor =
        qualityIndex < 50 ? 'bg-success' :
            qualityIndex < 100 ? 'bg-info' :
                qualityIndex < 150 ? 'bg-warning' :
                    qualityIndex < 200 ? 'bg-orange' : 'bg-danger';

    const contaminantes = [
        { label: 'PM10', valor: air.pm10, desc: 'Partículas <10μm' },
        { label: 'PM2.5', valor: air.pm2_5, desc: 'Partículas <2.5μm' },
        { label: 'NO₂', valor: air.no2, desc: 'Dióxido de nitrógeno' },
        { label: 'O₃', valor: air.o3, desc: 'Ozono' },
        { label: 'SO₂', valor: air.so2, desc: 'Dióxido de azufre' },
        { label: 'CO', valor: air.co, desc: 'Monóxido de carbono' },
    ];

    return (
        <div className="container py-4">
            {/* Encabezado */}
            <div className="card p-3 mb-4 shadow-sm">
                <h4 className="fw-bold mb-1">Calidad del aire hoy - {weatherData.location.name}, {weatherData.location.region}</h4>
                <small className="text-muted">Última actualización: {weatherData.current.last_updated}</small>
            </div>

            {/* Índice principal */}
            <div className="card shadow-sm p-4 mb-4">
                <div className="text-center mb-3">
                    <h1 className="fw-bold display-4">{qualityIndex}</h1>
                    <h5 className="text-muted">{nivel}</h5>
                </div>
                <div className="progress" style={{ height: '16px' }}>
                    <div
                        className={`progress-bar ${nivelColor}`}
                        role="progressbar"
                        style={{ width: `${Math.min(qualityIndex / 2, 100)}%` }}
                        aria-valuenow={qualityIndex}
                        aria-valuemin={0}
                        aria-valuemax={250}
                    ></div>
                </div>
                <p className="mt-3 mb-0">Contaminante principal: <strong>PM10</strong></p>
                <small className="text-muted">Impacto estimado: mínimo</small>
            </div>

            {/* Detalle de contaminantes */}
            <div className="card shadow-sm p-3">
                <h6 className="fw-bold mb-3">Contaminantes</h6>
                <div className="row row-cols-1 row-cols-md-3 g-3">
                    {contaminantes.map((c, i) => (
                        <div className="col" key={i}>
                            <div className="border rounded p-3 text-center">
                                <h6 className="fw-bold mb-0">{c.label}</h6>
                                <div className="fs-4 fw-bold text-success">{Math.round(c.valor)}</div>
                                <small className="text-muted d-block mb-1">{c.desc}</small>
                                <div className="small">{c.valor.toFixed(2)} μg/m³</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AirQuality;
