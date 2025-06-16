import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WeatherProvider } from './context/WeatherContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <WeatherProvider>
                    <App />
                </WeatherProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
