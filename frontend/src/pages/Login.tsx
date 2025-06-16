import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (!res.ok) throw new Error('Credenciales incorrectas');

            const data = await res.json();
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            navigate('/');
        } catch (err) {
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center bg-light"
            style={{ height: '87vh', overflow: 'hidden' }}
        >
            <div className="bg-white p-5 rounded shadow" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="text-center mb-1 fw-bold">¡Bienvenido de nuevo!</h2>
                <p className="text-center text-muted mb-3">Inicia sesión en tu cuenta.</p>
                <p className="text-center small">
                    ¿No tienes una cuenta?{' '}
                    <span
                        className="text-primary text-decoration-underline"
                        role="button"
                        onClick={() => navigate('/register')}
                    >
                        Regístrate
                    </span>
                </p>

                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
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
                        <div className="d-flex justify-content-between align-items-center">
                            <label htmlFor="password" className="form-label mb-0">Contraseña</label>
                            <a href="#" className="small text-primary text-decoration-underline">
                                ¿Olvidaste la clave?
                            </a>
                        </div>
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

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Acceder
                    </button>
                </form>

                <p className="text-muted mt-4 small text-center">
                    Puedes usar tu correo de <a href="#">ClimaX.com</a> y contraseña para iniciar sesión en apps como{' '}
                    <a href="#">ClimaX.com</a> y The Weather Channel.
                </p>

                <div className="d-flex justify-content-center gap-4 mt-3">
                    <a href="/terminos" className="small text-decoration-none">
                        Términos de uso
                    </a>
                    <a href="/privacidad" className="small text-decoration-none">
                        Política de Privacidad
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
