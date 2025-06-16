import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useWeather } from '../context/WeatherContext';
import '../../styles/Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const { fetchWeather, loading } = useWeather();
    const navigate = useNavigate();

    return (
        <>
            {/* Navbar principal */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
                <span
                    className="navbar-brand fw-bold"
                    role="button"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    ClimaX
                </span>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <div className="me-auto mt-3 mt-lg-0">
                        <SearchBar onSearch={fetchWeather} loading={loading} />
                    </div>

                    <div className="d-flex gap-2 align-items-center mt-3 mt-lg-0">
                        {user ? (
                            <>
                                <span className="text-white me-2 mb-0">
                                    Hola, <strong>{user.username || user.email}</strong>
                                </span>
                                <button className="btn btn-light btn-sm" onClick={logout}>
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-light btn-sm" onClick={() => navigate('/login')}>
                                    Iniciar sesión
                                </button>
                                <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/register')}>
                                    Registrarse
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Barra secundaria responsive */}
            <div className="bg-light border-top border-bottom">
                <div className="container py-2 text-center">
                    {/* Botón visible solo en móviles */}
                    <button
                        className="btn btn-outline-secondary d-md-none mb-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#secondaryNavbar"
                    >
                        Menú
                    </button>

                    <div className="collapse d-md-block" id="secondaryNavbar">
                        <div className="d-flex flex-wrap justify-content-center gap-2 text-center">
                            <button className="btn btn-link nav-hover" onClick={() => navigate('/dashboard')}>
                                Panel de control
                            </button>
                            <button className="btn btn-link nav-hover" onClick={() => navigate('/today')}>
                                Hoy
                            </button>
                            <button className="btn btn-link nav-hover" onClick={() => navigate('/forecast')}>
                                Por hora
                            </button>
                            <button className="btn btn-link nav-hover" onClick={() => navigate('/7dias')}>
                                7 días
                            </button>
                            <button className="btn btn-link nav-hover" onClick={() => navigate('/fin-de-semana')}>
                                Fin de semana
                            </button>
                            <button className="btn btn-link nav-hover" onClick={() => navigate('/mensual')}>
                                Mensual
                            </button>

                            {user && (
                                <button className="btn btn-link nav-hover" onClick={() => navigate('/radar')}>
                                    Radar
                                </button>
                            )}

                            {/* Menú desplegable */}
                            <div className="dropdown">
                                <button
                                    className="btn btn-link dropdown-toggle nav-hover"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    Mis pronósticos
                                </button>
                                <ul className="dropdown-menu p-3" style={{ minWidth: '280px' }}>
                                    <h6 className="dropdown-header text-uppercase fw-bold text-secondary">
                                        Pronósticos especiales
                                    </h6>
                                    <div className="d-flex flex-column gap-2">
                                        <button
                                            className="btn btn-hover-item"
                                            onClick={() => navigate('/alergias')}
                                        >
                                            Alergias
                                        </button>

                                        <button
                                            className="btn btn-hover-item"
                                            onClick={() => navigate('/aire')}
                                        >
                                            Calidad del aire
                                        </button>

                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
