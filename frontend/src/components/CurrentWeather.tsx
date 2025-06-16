type CurrentWeatherProps = {
    data: {
        location: {
            name: string;
            country: string;
            region: string;
            localtime: string;
        };
        current: {
            temp_c: number;
            condition: {
                text: string;
                icon: string;
            };
            feelslike_c: number;
            humidity: number;
            wind_kph: number;
            wind_dir: string;
            pressure_mb: number;
            last_updated: string;
        };
    };
};

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="card shadow p-4 mb-4 bg-light position-relative">
            <span className="position-absolute top-0 end-0 m-3 fs-3">🌡️</span>

            <div className="mb-3">
                <h2 className="mb-1">{data.location.name}, {data.location.country}</h2>
                <p className="text-muted mb-0">
                    {data.location.region} • {formatDate(data.current.last_updated)}
                </p>
            </div>

            <div className="d-flex align-items-center mb-3">
                <img
                    src={`https:${data.current.condition.icon}`}
                    alt={data.current.condition.text}
                    className="me-3"
                    width={80}
                    height={80}
                />
                <div>
                    <p className="display-4 mb-0">{data.current.temp_c}°<small className="fs-5 align-top">C</small></p>
                    <p className="text-muted">{data.current.condition.text}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <p className="mb-1"><strong>🌡️ Sensación:</strong> {data.current.feelslike_c}°C</p>
                    <p className="mb-1"><strong>💧 Humedad:</strong> {data.current.humidity}%</p>
                </div>
                <div className="col-md-6">
                    <p className="mb-1"><strong>🌬️ Viento:</strong> {data.current.wind_kph} km/h {data.current.wind_dir}</p>
                    <p className="mb-1"><strong>📊 Presión:</strong> {data.current.pressure_mb} mb</p>
                </div>
            </div>
        </div>
    );
};
