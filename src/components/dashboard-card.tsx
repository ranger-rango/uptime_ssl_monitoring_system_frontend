interface DashboardCardProps
{
    metric : number | string
    metricInfo ?: number | string
    backgroundColour : string
}

export default function DashboardCard( { metric, metricInfo, backgroundColour } : DashboardCardProps )
{
    return (
        <div className="dashboard-card" style={{ backgroundColor: backgroundColour }}>
            <p className="dashboard-card-metric"> { metric } </p>
            { metricInfo && <p className="dashboard-card-info"> { metricInfo } </p> }
        </div>
    )
}