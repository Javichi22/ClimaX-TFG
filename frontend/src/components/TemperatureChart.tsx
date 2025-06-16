import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';

type TemperatureChartProps = {
    hourlyData: Array<{
        time: string;
        temp: number;
    }>;
};

export const TemperatureChart = ({ hourlyData }: TemperatureChartProps) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <h5 className="fw-bold mb-3">📈 Temperatura por horas</h5>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis unit="°C" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}
                        formatter={(value: number) => `${value}°C`}
                    />
                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#0d6efd"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, stroke: '#0d6efd', strokeWidth: 2, fill: '#fff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
