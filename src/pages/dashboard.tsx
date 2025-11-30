import DashboardCard from "@/components/dashboard-card";
import DashboardCharts from "@/components/dashboard-charts";
import { getUserAuthToken } from "@/components/get-user-auth-token"
import useFetchData from "@/components/use-fetch-data"
import { subDays, isAfter } from 'date-fns';
import { useMemo } from "react";

interface servicesHealthStatsProps
{
    servicesUp : number
    servicesDown : number
    servicesUptimePercentage : string
    last24hUptimePercentage : string
    last7dUptimePercentage : string
    last30dUptimePercentage : string
}
const baseUrl : string = import.meta.env.VITE_BASE_URL
const authToken : string = getUserAuthToken()

function fetchServicesStats()
{
    const servicesUrl : string = baseUrl.concat(import.meta.env.VITE_GET_SERVICES_ENDPOINT)
    const { data, isLoading, error } = useFetchData(servicesUrl, authToken)
    sessionStorage.setItem("serviceStats", JSON.stringify(data))
    let serviceCount : number = 0
    if (data)
    {
        serviceCount = Object.keys(data).length
    }
    if (isLoading || error) {}
    return serviceCount
}

interface ServiceLogEntry
{
    check_at: string;
    svc_health_status: 'UP' | 'DOWN' | string;
}

function calculateMetricsForLogs(logs: ServiceLogEntry[])
{
    const upChecks = logs.filter(log => log.svc_health_status === 'UP').length;
    const downChecks = logs.filter(log => log.svc_health_status === 'DOWN').length;
    const totalChecks = upChecks + downChecks;
    
    const percentage = totalChecks > 0 ? (upChecks / totalChecks) * 100 : 0;
    
    return {
        upChecks,
        downChecks,
        totalChecks,
        uptimePercentage: percentage.toFixed(2)
    };
}

function fetchServiceHealthStats()
{
    const svcCheckLogsUrl : string = baseUrl.concat(import.meta.env.VITE_GET_SERVICE_CHECK_LOGS_ENDPOINT)
    const { data, isLoading, error } = useFetchData(svcCheckLogsUrl, authToken)
    sessionStorage.setItem("serviceHealthStats", JSON.stringify(data))
    if (isLoading || error) {}

    const svcHealthStats : servicesHealthStatsProps = useMemo(() => 
    {
        let servicesUp : number = 0
        let servicesDown : number = 0
        let servicesUptimePercentage : string = ""
        let last24hUptimePercentage : string = ""
        let last7dUptimePercentage : string = ""
        let last30dUptimePercentage : string = ""

        if (!data)
        {
            return { servicesUp: 0, servicesDown: 0, servicesUptimePercentage: "0.00", last24hUptimePercentage: "0.00", last7dUptimePercentage: "0.00", last30dUptimePercentage: "0.00" } as servicesHealthStatsProps;
        }

        if (data)
        {
            const allLogs: ServiceLogEntry[] = Object.values(data as object)

            const now = new Date()
            const boundary24h = subDays(now, 1)
            const boundary7d = subDays(now, 7)
            const boundary30d = subDays(now, 30)

            const logs24h = allLogs.filter(log => isAfter(new Date(log.check_at), boundary24h))
            const logs7d = allLogs.filter(log => isAfter(new Date(log.check_at), boundary7d))
            const logs30d = allLogs.filter(log => isAfter(new Date(log.check_at), boundary30d))

            const metricsAllTime = calculateMetricsForLogs(allLogs)
            const metrics24h = calculateMetricsForLogs(logs24h)
            const metrics7d = calculateMetricsForLogs(logs7d)
            const metrics30d = calculateMetricsForLogs(logs30d)

            servicesUp = metricsAllTime.upChecks
            servicesDown = metricsAllTime.downChecks
            servicesUptimePercentage = metricsAllTime.uptimePercentage
            last24hUptimePercentage = metrics24h.uptimePercentage
            last7dUptimePercentage = metrics7d.uptimePercentage
            last30dUptimePercentage = metrics30d.uptimePercentage
        }

        return { servicesUp, servicesDown, servicesUptimePercentage, last24hUptimePercentage, last7dUptimePercentage, last30dUptimePercentage } as servicesHealthStatsProps
    }, [data])

    return svcHealthStats
}

interface sslHealthStatsProps
{
    sentExpiryWarning : number
    expiryWarningsPercentage : number
    expiredSslCerts : number
    expiredSslCertsPercentage : number
}

function fetchSslHealthStats()
{
    const svcCheckLogsUrl : string = baseUrl.concat(import.meta.env.VITE_GET_SERVICE_SSL_CHECK_LOGS_ENDPOINT)
    const { data, isLoading, error } = useFetchData(svcCheckLogsUrl, authToken)
    sessionStorage.setItem("sslHealthStats", JSON.stringify(data))
    if (isLoading || error) {}
    let sentExpiryWarning : number = 0
    let expiryWarningsPercentage : number = 0
    let expiredSslCerts : number = 0
    let expiredSslCertsPercentage : number = 0
    let totalSslLogs : number = 0
    if (data)
    {
        totalSslLogs = Object.keys(data).length

        Object.values(data).forEach((log : any) => 
        {
            if (log.cert_health_status === "WATCH")
            {
                sentExpiryWarning++
            }
            if (log.cert_health_status === "EXPIRED")
            {
                expiredSslCerts++
            }
            if (log.cert_health_status === "EXPIRED")
            {
                expiredSslCerts++
            }

        })
    }

    expiryWarningsPercentage = (sentExpiryWarning / totalSslLogs) * 100
    expiredSslCertsPercentage = (expiredSslCerts / totalSslLogs) * 100

    const sslHealthStatus  : sslHealthStatsProps = { sentExpiryWarning, expiryWarningsPercentage, expiredSslCerts, expiredSslCertsPercentage }
    return sslHealthStatus
}

export default function DashboardPage()
{
    const serviceCount = fetchServicesStats()
    const serviceHealthStats = fetchServiceHealthStats()
    const sslHealthStats = fetchSslHealthStats()

    return (
        <div className="dashboard-container">

            <div className="dashboard-section">
                <h2 className="dash-section-heading">Services Information</h2>
                <DashboardCard metric={serviceCount} metricInfo="Total Service Count" backgroundColour="#0ba5de" />
            </div>

            <div className="dashboard-section">
                <h2 className="dash-section-heading">Services Health Statistics</h2>
                <DashboardCard metric={serviceHealthStats.servicesUp} metricInfo="Logs Services Up" backgroundColour="green" />
                <DashboardCard metric={serviceHealthStats.servicesDown} metricInfo="Logs Services Down" backgroundColour="red" />
                <DashboardCard metric={serviceHealthStats.servicesUptimePercentage} metricInfo="Uptime Percentage" backgroundColour="green" />
                <DashboardCard metric={serviceHealthStats.last24hUptimePercentage} metricInfo="Uptime Percentage (24h)" backgroundColour="green" />
                <DashboardCard metric={serviceHealthStats.last7dUptimePercentage} metricInfo="Uptime Percentage (7d)" backgroundColour="green" />
                <DashboardCard metric={serviceHealthStats.last30dUptimePercentage} metricInfo="Uptime Percentage (30d)" backgroundColour="green" />
            </div>

            <div className="dashboard-section">
                <h2 className="dash-section-heading">Services SSL Health Statistics</h2>
                <DashboardCard metric={sslHealthStats.sentExpiryWarning} metricInfo="SSL Expiry Warnings" backgroundColour="orange" />
                <DashboardCard metric={sslHealthStats.expiryWarningsPercentage} metricInfo="SSL Expiry Warnings %" backgroundColour="orange" />
                <DashboardCard metric={sslHealthStats.expiredSslCerts} metricInfo="Expired Certificates" backgroundColour="red" />
                <DashboardCard metric={sslHealthStats.expiredSslCertsPercentage} metricInfo="Expired Certificates %" backgroundColour="red" />
            </div>

            <h2 className="dash-section-heading">Visual Metrics</h2>
            <DashboardCharts
                servicesUp={serviceHealthStats.servicesUp}
                servicesDown={serviceHealthStats.servicesDown}
                uptime24h={parseFloat(serviceHealthStats.last24hUptimePercentage)}
                uptime7d={parseFloat(serviceHealthStats.last7dUptimePercentage)}
                uptime30d={parseFloat(serviceHealthStats.last30dUptimePercentage)}
                sslWarnings={sslHealthStats.sentExpiryWarning}
                expiredCerts={sslHealthStats.expiredSslCerts}
            />

        </div>
    );
}
