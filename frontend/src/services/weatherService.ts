export type CalendarDay = {
  date: string;
  max: number;
  min: number;
  icon: string;
  condition: string;
  sunrise?: string;
  sunset?: string;
  moonrise?: string;
  moonset?: string;
  moon_phase?: string;
};

export interface WeatherData {
  location: any;
  current: {
    air_quality: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
    };
    last_updated: string;
    // otros campos
  };
  forecast: any;
}

export const getWeatherForecast = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`http://localhost:8080/api/weather/${city}?aqi=yes`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Ciudad no encontrada');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    throw error;
  }
};

export const getMonthlyView = async (city: string): Promise<CalendarDay[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/weather/${city}?aqi=yes`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Ciudad no encontrada');
    }

    const days = data.forecast?.forecastday ?? [];

    const calendarDays: CalendarDay[] = [];

    while (calendarDays.length < 30) {
      for (const day of days) {
        if (calendarDays.length >= 30) break;
        calendarDays.push({
          date: day.date,
          max: day.day.maxtemp_c,
          min: day.day.mintemp_c,
          icon: day.day.condition.icon,
          condition: day.day.condition.text,
          sunrise: day.astro.sunrise,
          sunset: day.astro.sunset,
          moonrise: day.astro.moonrise,
          moonset: day.astro.moonset,
          moon_phase: day.astro.moon_phase,
        });
      }
    }

    return calendarDays;
  } catch (error) {
    console.error('Error al obtener el pronóstico mensual:', error);
    throw error;
  }
};


