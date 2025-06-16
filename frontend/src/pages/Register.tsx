import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import persona from '../../public/assets/persona.jpg';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        fechaNacimiento: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Error al registrar');
            navigate('/login');
        } catch (err) {
            setError('Error al registrar');
        }
    };

    return (
        <div className="container-fluid bg-light p-0" style={{ height: '93vh', overflow: 'hidden' }}>
            <div className="row g-0 h-100">
                {/* Imagen */}
                <div className="col-md-6 h-100">
                    <img
                        src={persona}
                        alt="Persona"
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Formulario */}
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-white shadow-sm h-100">
                    <div className="p-4" style={{ width: '100%', maxWidth: '480px' }}>
                        <div className="mb-4 p-3 border rounded bg-light">
                            <h5 className="fw-semibold mb-2">Desbloquea más gratis</h5>
                            <ul className="mb-0 small ps-3">
                                <li>Guarda tus ubicaciones favoritas y accede a ellas desde cualquier lugar</li>
                                <li>Crea tu panel de control personalizado de la manera que desees</li>
                                <li>Configura tus preferencias de pronóstico en todos los dispositivos</li>
                            </ul>
                        </div>

                        <h3 className="text-center mb-4">Crear cuenta</h3>

                        {error && (
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    value={form.fechaNacimiento}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <p className="text-muted small mb-3">
                                * Al continuar, aceptas nuestros{' '}
                                <a href="/terminos" target="_blank" rel="noopener noreferrer">Términos de uso</a> y{' '}
                                <a href="/privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.
                            </p>

                            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                        </form>

                        <p className="mt-3 text-center mb-0">
                            ¿Ya tienes cuenta?{' '}
                            <span
                                className="text-primary text-decoration-underline"
                                role="button"
                                onClick={() => navigate('/login')}
                            >
                                Iniciar sesión
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
