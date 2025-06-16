import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getWeatherForecast } from '../services/weatherService';
import type { WeatherData } from '../services/weatherService';

type WeatherContextType = {
    weatherData: WeatherData | null;
    loading: boolean;
    error: string | null;
    fetchWeather: (city: string) => Promise<void>;
    fetchWeatherData: (city: string) => Promise<WeatherData | null>;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (city: string) => {
        if (!city.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const data = await getWeatherForecast(city);
            setWeatherData(data);
        } catch (err) {
            setError('No se pudo encontrar el clima para esta ciudad');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherData = async (city: string): Promise<WeatherData | null> => {
        if (!city.trim()) return null;

        try {
            const data = await getWeatherForecast(city);
            return data;
        } catch {
            return null;
        }
    };

    return (
        <WeatherContext.Provider value={{ weatherData, loading, error, fetchWeather, fetchWeatherData }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
