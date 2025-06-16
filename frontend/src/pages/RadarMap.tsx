import React, { useEffect, useRef, useState } from "react";

const RadarMap: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [coords, setCoords] = useState<[number, number]>([36.47, -6.2]); // Coordenadas iniciales: San Fernando
    const [cityName, setCityName] = useState("San Fernando");

    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&accept-language=es`);
            const data = await res.json();
            if (!data.length) {
                alert("Ciudad o país no encontrado.");
                return;
            }
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setCoords([lat, lon]);
            setCityName(data[0].display_name || searchQuery);
            setSearchQuery("");
        } catch (error) {
            alert("Error en la búsqueda");
        }
    };

    return (
        <div className="container-fluid bg-light py-4">
            <div className="container">
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Radar meteorológico</h4>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Buscar ciudad o país..."
                            className="form-control me-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                    </div>
                </div>

                <div className="card shadow-sm p-3">
                    <h6 className="fw-bold mb-3">Ubicación: {cityName}</h6>
                    <iframe
                        title="Radar Windy"
                        width="100%"
                        height="500"
                        src={`https://embed.windy.com/embed2.html?lat=${coords[0]}&lon=${coords[1]}&detailLat=${coords[0]}&detailLon=${coords[1]}&width=650&height=450&zoom=7&level=surface&overlay=radar&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
                        frameBorder="0"
                        style={{ borderRadius: "12px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RadarMap;
