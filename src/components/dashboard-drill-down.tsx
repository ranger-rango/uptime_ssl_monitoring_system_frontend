import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ServiceStat {
  service_id: string;
  service_name: string;
  service_url_domain: string;
  svc_registration_status: string;
}

interface ServiceHealthLog {
  service_id: string;
  svc_health_status: string;
  check_at: string;
  response_time_ms?: number;
  http_response_code?: number;
  error_message?: string;
}

interface SslHealthLog {
  cert_id: string;
  service_id: string;
  cert_health_status: string;
  last_checked_timestamp: string;
}

interface DrillDownDashboardProps {
  serviceId: string;
}

export default function DrillDownDashboard({ serviceId }: DrillDownDashboardProps) {
  const [serviceInfo, setServiceInfo] = useState<ServiceStat | null>(null);
  const [healthLogs, setHealthLogs] = useState<ServiceHealthLog[]>([]);
  const [sslLogs, setSslLogs] = useState<SslHealthLog[]>([]);

useEffect(() => {
  const serviceStatsRaw = sessionStorage.getItem("serviceStats");
  if (serviceStatsRaw) {
    try {
      const parsed = JSON.parse(serviceStatsRaw) as Record<string, ServiceStat>;
      const svc = Object.values(parsed).find(
        (s) => (s as ServiceStat).service_id === serviceId
      ) as ServiceStat | undefined;
      setServiceInfo(svc || null);
    } catch (err) {
      console.error("Failed to parse serviceStats", err);
    }
  }

  const healthStatsRaw = sessionStorage.getItem("serviceHealthStats");
  if (healthStatsRaw) {
    try {
      const parsed = JSON.parse(healthStatsRaw) as Record<string, ServiceHealthLog>;
      const logs = Object.values(parsed)
        .filter((log) => (log as ServiceHealthLog).service_id === serviceId)
        .map((log) => log as ServiceHealthLog);
      setHealthLogs(logs);
    } catch (err) {
      console.error("Failed to parse serviceHealthStats", err);
    }
  }

  const sslStatsRaw = sessionStorage.getItem("sslHealthStats");
  if (sslStatsRaw) {
    try {
      const parsed = JSON.parse(sslStatsRaw) as Record<string, SslHealthLog>;
      const logs = Object.values(parsed)
        .filter((log) => (log as SslHealthLog).service_id === serviceId)
        .map((log) => log as SslHealthLog);
      setSslLogs(logs);
    } catch (err) {
      console.error("Failed to parse sslHealthStats", err);
    }
  }
}, [serviceId]);


  if (!serviceInfo) {
    return <p>No service information found.</p>;
  }

  // Prepare data for Pie chart
  const upCount = healthLogs.filter(log => log.svc_health_status === 'UP').length;
  const downCount = healthLogs.filter(log => log.svc_health_status === 'DOWN').length;

  const pieData = {
    labels: ['UP', 'DOWN'],
    datasets: [
      {
        label: 'Service Health Status',
        data: [upCount, downCount],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="drilldown-dashboard">
        <div>
            <h3>Registered Service</h3>
            <table className="drilldown-table">
            <thead>
                <tr>
                <th>Service Name</th>
                <th>Domain</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{serviceInfo.service_name}</td>
                <td>{serviceInfo.service_url_domain}</td>
                <td>{serviceInfo.svc_registration_status}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div>
            <h3>Service Health Overview</h3>
            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Pie data={pieData} />
            </div>
        </div>

        <div>
            <h3>Health Check Logs</h3>
            <table className="drilldown-table">
            <thead>
                <tr>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Response Time (ms)</th>
                <th>HTTP Code</th>
                <th>Error</th>
                </tr>
            </thead>
            <tbody>
                {healthLogs.map((log, idx) => (
                <tr key={idx}>
                    <td>{new Date(log.check_at).toLocaleString()}</td>
                    <td>{log.svc_health_status}</td>
                    <td>{log.response_time_ms ?? "-"}</td>
                    <td>{log.http_response_code ?? "-"}</td>
                    <td>{log.error_message ?? "-"}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div>
            <h3>SSL Health Logs</h3>
            <table className="drilldown-table">
            <thead>
                <tr>
                <th>Cert ID</th>
                <th>Status</th>
                <th>Last Checked</th>
                </tr>
            </thead>
            <tbody>
                {sslLogs.map((log, idx) => (
                <tr key={idx}>
                    <td>{log.cert_id}</td>
                    <td>{log.cert_health_status}</td>
                    <td>{new Date(log.last_checked_timestamp).toLocaleString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
}
