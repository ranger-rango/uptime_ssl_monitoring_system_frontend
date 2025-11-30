import { getUserAuthToken } from "@/components/get-user-auth-token"
import TableManager from "@/components/table-manager"
import { Link } from "@tanstack/react-router"

export default function ViewServicesPage()
{
    const endpoint = import.meta.env.VITE_GET_SERVICES_ENDPOINT
    const baseUrl : string = import.meta.env.VITE_BASE_URL
    const url = baseUrl.concat(endpoint)
    const authToken : string = getUserAuthToken()

    const colHeaders : any[] = [
        {
            id : "service_id",
            columnName : "ServiceId",
            hide : false,
            render : false
        },
        {
            id : "service_name",
            columnName : "ServiceName",
            hide : false,
            render : false
        },
        {
            id : "service_url_domain",
            columnName : "ServiceDomain",
            hide : false,
            render : false
        },
        {
            id : "svc_registration_status",
            columnName : "SvcRegistrationStatus",
            hide : false,
            render : false
        },
        {
            id : "diagnosis_method",
            columnName : "DiagnosisMethod",
            hide : false,
            render : false
        },
        {
            id : "svc_diagnosis_interval",
            columnName : "SvcDiagnosisInterval",
            hide : false,
            render : false
        },
        {
            id : "num_of_retries",
            columnName : "NumOfRetries",
            hide : false,
            render : false
        },
        {
            id : "retry_interval_secs",
            columnName : "Retry Interval Secs",
            hide : false,
            render : false
        },
        {
            id : "cert_id",
            columnName : "CertId",
            hide : false,
            render : false
        },
        {
            id : "issuer",
            columnName : "Issuer",
            hide : false,
            render : false
        },
        {
            id : "expiry_date",
            columnName : "Expiry Date",
            hide : false,
            render : false
        },
        {
            id : "cert_diagnosis_interval",
            columnName : "Cert Diagnosis Interval",
            hide : false,
            render : false
        },
        {
            id : "alert_threshold_days",
            columnName : "Alert Threshold Days",
            hide : false,
            render : false
        },
    ]
    return (
        <>
            <div className="link-btns-container">
                <Link className="link-button pri-btn" to="/register-service">
                    Create Service
                </Link>
            </div>

            <TableManager url={url} authToken={authToken} ColHeaders={colHeaders} table="SERVICES" />
        </>
    )
}