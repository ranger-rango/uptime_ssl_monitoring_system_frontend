interface SelectOption
{
    label: string;
    value: string;
}

export const addContactGroups = (contactGroups: { [key: string]: string }): SelectOption[] =>
{
    if (!contactGroups || typeof contactGroups !== "object") {
        return [];
    }

    return Object.entries(contactGroups).map(([key, val]) => (
    {
        label : val,
        value : key
    }));
}


export const registerServiceFormSchema : any = (contactGroupOptions: SelectOption[]): any => ({
    id : "service-registration",
    meta : {
        title : "Register Service",
        subtitle : "Create a service and configurations"
    },
    fields : {
        service_name: {
            id: "service_name",
            label: "Service Name",
            renderer: "text",
            placeholder: "",
            rules: { required: "Service Name is required" }
        },
        service_url_domain: {
            id: "service_url_domain",
            label: "Service URL",
            renderer: "text",
            placeholder: "https://www.example.com",
            rules: { 
                required: "Service Name is required",
                pattern: {
                    value: /^(https?:\/\/)[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\/.*)?$/i,
                    message: "URL has to be absolute, i.e. start with http:// | https://"
                }
            }
        },
        service_port: {
            id: "service_port",
            label: "Service Port",
            renderer: "number",
            defaultValue: 8080
        },
        diagnosis_method: {
            id: "diagnosis_method",
            label: "Diagnosis Method",
            renderer: "select",
            placeholder: "Select Diagnosis Method",
            props: {
                data: [
                    { label: "PING", value: "PING" },
                    { label: "REQUEST", value: "REQUEST" },
                    { label: "PORT_SCAN", value: "PORT_SCAN" },
                    { label: "HEAD", value: "HEAD" },
                    { label: "OPTIONS", value: "OPTIONS" },
                    { label: "TLS_HANDSHAKE", value: "TLS_HANDSHAKE" }
                ]
            },
            rules: { required: "Please select a diagnosis method" }
        },
        svc_diagnosis_interval: {
            id: "svc_diagnosis_interval",
            label: "Service Diagnosis Interval (seconds)",
            renderer: "number",
            defaultValue: 300
        },
        num_of_retries: {
            id: "num_of_retries",
            label: "Number of Retries",
            renderer: "number",
            defaultValue: 5
        },
        retry_interval_secs: {
            id: "retry_interval_secs",
            label: "Retry Interval (seconds)",
            renderer: "number",
            defaultValue: 45
        },
        cert_diagnosis_interval: {
            id: "cert_diagnosis_interval",
            label: "Cert Diagnosis Interval (seconds)",
            renderer: "number",
            defaultValue: 43200
        },
        alert_threshold_days: {
            id: "alert_threshold_days",
            label: "Alert Threshold Days (days)",
            renderer: "number",
            defaultValue: 10
        },
        contact_groups: {
            id: "contact_groups",
            label: "Contact Groups",
            renderer: "multiselect",
            placeholder: "Select Contact Groups",
            props: {
                data: contactGroupOptions
            },
            rules: { required: "Please select a contact group" }
        }
    },
    layout : [
        {
            kind: "section",
            title: "Service Information",
            withDivider: true,
            children: [
                {
                    kind: "grid",
                    cols: 2,
                    spacing: "md",
                    children: [
                        { kind: "field", fieldId: "service_name" },
                        { kind: "field", fieldId: "service_url_domain" },
                        { kind: "field", fieldId: "service_port" }
                    ]
                }
            ]
        },
        {
            kind: "section",
            title: "Service Health Check Configurations",
            withDivider: true,
            children: [
                {
                    kind: "grid",
                    cols: 2,
                    spacing: "md",
                    children: [
                        { kind: "field", fieldId: "diagnosis_method" },
                        { kind: "field", fieldId: "svc_diagnosis_interval" },
                        { kind: "field", fieldId: "num_of_retries" },
                        { kind: "field", fieldId: "retry_interval_secs" }
                    ]
                }
            ]
        },
        {
            kind: "section",
            title: "Certificate Health Check Configurations",
            withDivider: true,
            children: [
                {
                    kind: "grid",
                    cols: 2,
                    spacing: "md",
                    children: [
                        { kind: "field", fieldId: "cert_diagnosis_interval" },
                        { kind: "field", fieldId: "alert_threshold_days" }
                    ]
                }
            ]
        },
        {
            kind: "section",
            title: "Contact Group",
            withDivider: true,
            children: [
                {
                    kind: "grid",
                    cols: 2,
                    spacing: "md",
                    children: [
                        { kind: "field", fieldId: "contact_groups" },
                    ]
                }
            ]
        },
    ]
})