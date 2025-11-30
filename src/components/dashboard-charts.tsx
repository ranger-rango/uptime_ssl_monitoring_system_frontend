import {
    PieChart, Pie, Cell,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from "recharts";

interface ChartsProps {
    servicesUp: number;
    servicesDown: number;
    uptime24h: number;
    uptime7d: number;
    uptime30d: number;
    sslWarnings: number;
    expiredCerts: number;
}

const COLORS = ["#22c55e", "#ef4444", "#f97316", "#0ea5e9"]

export default function DashboardCharts({
    servicesUp,
    servicesDown,
    uptime24h,
    uptime7d,
    uptime30d,
    sslWarnings,
    expiredCerts
}: ChartsProps)
{
    const serviceStatusData = [
        { name: "Up", value: servicesUp },
        { name: "Down", value: servicesDown }
    ];

    const uptimeTrendData = [
        { name: "24h", uptime: uptime24h },
        { name: "7d", uptime: uptime7d },
        { name: "30d", uptime: uptime30d }
    ];

    const sslData = [
        { name: "Warnings", value: sslWarnings },
        { name: "Expired", value: expiredCerts }
    ];

    return (
        <div className="charts-grid">

            <div className="chart-card">
                <h3>Services Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={serviceStatusData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            label
                        >
                            {serviceStatusData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>Uptime Trend (24h → 30d)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={uptimeTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="uptime" stroke="#0ea5e9" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>SSL Certificate Health</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={sslData} dataKey="value" nameKey="name" outerRadius={80} label>
                            {sslData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i + 2]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
