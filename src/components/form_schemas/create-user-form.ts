
export const createUserFormSchema : any = {
    id : "create-user-form",
    meta : {
        title : "Create User",
        subtitle : "Create a new user."
    },
    fields : {
        role_title: {
            id: "role_title",
            label: "User Role",
            renderer: "select",
            placeholder: "Select Role",
            props: {
                data: [
                    { label: "ADMIN", value: "ADMIN" },
                    { label: "OPERATOR", value: "OPERATOR" },
                    { label: "VIEWER", value: "VIEWER" }
                ]
            },
            rules: { required: "Please select an account type" }
        },
        channel_title: {
            id: "channel_title",
            label: "Notification Channel",
            renderer: "select",
            placeholder: "Select Channel",
            props: {
                data: [
                    { label: "Email Address", value: "EMAIL" },
                    { label: "Telegram", value: "TELEGRAM" },
                    { label: "SMS", value: "SMS" }
                ]
            },
            rules: { required: "Please select an notification channel" }
        },
        email_address: {
            id: "email_address",
            label: "Email Address",
            renderer: "text",
            inputType: "email",
            placeholder: "you@example.com (registration link sent here)",
            rules: {
                required: "Email Address is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email"
                }
            }
        },
        tel: {
            id: "tel",
            label: "Phone Number",
            renderer: "text",
            inputType: "tel",
            placeholder: "254712345678",
            rules: {
                required: "Phone number is required",
                pattern: {
                    value: /^254[17]\d{8}$/,
                    message: "Invalid phone number (254XXXXXXXXX)"
                }
            }
        },
        telegram: {
            id: "telegram",
            label: "Telegram",
            renderer: "text",
            placeholder: "Telegram tag",
            rules: { required: "Telegram is required" }
        },
        first_name: {
            id: "first_name",
            label: "First Name",
            renderer: "text",
            placeholder: "John",
            rules: { required: "First name is required" }
        },
        middle_name: {
            id: "middle_name",
            label: "Middle Name",
            renderer: "text",
            placeholder: "John",
            rules: { required: "Middle name is required" }
        },
        surname: {
            id: "surname",
            label: "Surname",
            renderer: "text",
            placeholder: "Doe",
            rules: { required: "Surname is required" }
        },
    },
    layout: [
        {
            kind: "stack",
            spacing: "md",
            children: [
                { kind: "field", fieldId: "role_title" },
                { kind: "field", fieldId: "channel_title" },
                { kind: "field", fieldId: "email_address" },
                { kind: "field", fieldId: "tel" },
                { kind: "field", fieldId: "telegram" },
                { kind: "field", fieldId: "first_name" },
                { kind: "field", fieldId: "middle_name" },
                { kind: "field", fieldId: "surname" }
            ]
        }
    ]
}