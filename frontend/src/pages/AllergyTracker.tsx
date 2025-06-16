import { useState } from 'react';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';

const AllergyTracker = () => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="container py-4">
            {/* Desglose de polen */}
            <div className="card mb-4 shadow-sm position-relative">
                <div className="card-body">
                    <h4 className="fw-bold mb-3">Desglose de polen</h4>
                    <p className="mb-4">
                        ¿Sabes qué tipos de polen agravan tus síntomas? Esta es la previsión de los próximos 3 días para los peores alérgenos.
                    </p>

                    <div className="row text-center">
                        {/* Árboles */}
                        <div className="col-md-4 mb-4 d-flex flex-column align-items-center">
                            <img src="/assets/1.jpg" alt="Polen árboles" className="mb-2" style={{ width: '60px' }} />
                            <p className="fw-bold">Polen de los árboles</p>
                            {['Hoy', 'Mañana', 'Martes'].map((dia) => (
                                <p key={dia}>
                                    <span className="me-2 d-inline-block rounded-circle" style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: '#ccc',
                                    }}></span>
                                    {dia}: <strong>Ninguno</strong>
                                </p>
                            ))}
                        </div>

                        {/* Pasto */}
                        <div className="col-md-4 mb-4 d-flex flex-column align-items-center">
                            <img src="/assets/2.jpg" alt="Polen pasto" className="mb-2" style={{ width: '60px' }} />
                            <p className="fw-bold">Polen de pasto</p>
                            {['Hoy', 'Mañana', 'Martes'].map((dia) => (
                                <p key={dia}>
                                    <span className="me-2 d-inline-block rounded-circle" style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: '#a7f107',
                                    }}></span>
                                    {dia}: <strong>Bajo</strong>
                                </p>
                            ))}
                        </div>

                        {/* Maleza */}
                        <div className="col-md-4 mb-4 d-flex flex-column align-items-center">
                            <img src="/assets/3.jpg" alt="Polen maleza" className="mb-2" style={{ width: '60px' }} />
                            <p className="fw-bold">Polen de la maleza</p>
                            {['Hoy', 'Mañana', 'Martes'].map((dia) => (
                                <p key={dia}>
                                    <span className="me-2 d-inline-block rounded-circle" style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: '#ccc',
                                    }}></span>
                                    {dia}: <strong>Ninguno</strong>
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Info tooltip + botón */}
                    <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setShowInfo(true)}
                        >
                            <FaInfoCircle className="me-1" />
                            Sobre el desglose de polen
                        </button>
                    </div>

                    {showInfo && (
                        <div className="position-absolute top-0 end-0 mt-3 me-3 shadow-lg bg-white border rounded p-3" style={{ width: 350, zIndex: 999 }}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="fw-bold mb-0">¿Qué informe es adecuado para ti?</h6>
                                <button className="btn btn-sm" onClick={() => setShowInfo(false)}>
                                    <FaTimes />
                                </button>
                            </div>
                            <ul className="list-unstyled mb-2">
                                {[
                                    { color: '#ccc', label: 'Ninguno' },
                                    { color: '#4caf50', label: 'Muy bajo' },
                                    { color: '#a7f107', label: 'Bajo' },
                                    { color: '#ffc107', label: 'Moderado' },
                                    { color: '#ff9800', label: 'Alto' },
                                    { color: '#f44336', label: 'Muy alto' },
                                ].map((item, idx) => (
                                    <li key={idx} className="d-flex align-items-center mb-1">
                                        <span className="rounded-circle me-2" style={{
                                            width: 12, height: 12, backgroundColor: item.color
                                        }}></span>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                            <p className="small mb-0 text-muted">
                                El desglose de polen cubre los tipos específicos, como el de la maleza, mientras que el recuento de polen de hoy hace un seguimiento de TODOS los tipos de polen. El pronóstico para 15 días cubre más de un tipo de polen; por lo tanto, incluso si el nivel es bajo, el riesgo general de alergia puede ser alto.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Consejos */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">Consejos para manejar tus alergias</h5>
                    <div className="row">
                        {[
                            {
                                img: '/assets/4.jpg',
                                title: 'Dúchate después de haber estado al aire libre',
                                text: 'Para quitarte el polen que trajiste de afuera, toma una ducha y cámbiate la ropa.'
                            },
                            {
                                img: '/assets/5.jpg',
                                title: 'Minimiza el polen en tu hogar',
                                text: 'Mantén las ventanas cerradas y usa el aire acondicionado o un purificador HEPA.'
                            },
                            {
                                img: '/assets/6.jpg',
                                title: 'Consulta el tiempo',
                                text: 'Entérate cuándo las condiciones como el viento aumentarán los niveles de polen.'
                            },
                            {
                                img: '/assets/7.jpg',
                                title: 'Conoce tus opciones',
                                text: 'Habla con el médico para conocer opciones, ya sean medicamentos o aerosoles.'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="col-md-6 mb-3 d-flex">
                                <img src={item.img} alt={item.title} className="me-3 rounded-circle"
                                     style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                <p>
                                    <strong>{item.title}</strong> — {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllergyTracker;
