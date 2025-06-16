import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forecast from './pages/Forecast';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import Today from './pages/Today';
import RadarMap from './pages/RadarMap';
import AllergyTracker from './pages/AllergyTracker';
import SevenDays from './pages/SevenDays.tsx';
import Weekend from './pages/Weekend';
import Monthly from "./pages/MonthlyForecast.tsx";
import AirQuality from './pages/AirQuality';

function App() {
    const { user } = useAuth();

    return (
        <>
            <Header/>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/today" element={<Today/>}/>
                <Route path="/forecast" element={<Forecast/>}/>
                <Route path="/7dias" element={<SevenDays/>}/>
                <Route path="/fin-de-semana" element={<Weekend/>}/>
                <Route path="/mensual" element={<Monthly/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/terminos" element={<Terms/>}/>
                <Route path="/privacidad" element={<Privacy/>}/>
                <Route path="/alergias" element={<AllergyTracker/>}/>
                <Route path="/aire" element={<AirQuality/>}/>

                {/* Rutas protegidas */}
                {user && (
                    <Route path="/radar" element={<RadarMap/>}/>
                )}
            </Routes>

            {/* Footer global */}
            <footer className="bg-light text-dark text-center py-3 mt-auto border-top">
                © 2025 Javier Garrido Ojeda – ClimaXTFG. Todos los derechos reservados.
            </footer>

        </>
    );
}

export default App;
