
export const loginFormSchema : any = {
    id : "login-form",
    meta : {
        title : "Login",
        subtitle : "Login to the System"
    },
    fields : {
        email_address: {
            id: "email_address",
            label: "Email",
            renderer: "text",
            inputType: "email",
            placeholder: "you@example.com",
            rules: {
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email"
                }
            }
        },
        password: {
            id: "password",
            label: "Password",
            renderer: "text",
            inputType: "password",
            rules: {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain uppercase, lowercase, and number"
                }
            }
        },
        remember_me: {
            id: "remember_me",
            label: "Remember Me",
            renderer: "checkbox",
            defaultValue: false
        }
    },
    layout: [
        {
            kind: "stack",
            spacing: "md",
            children: [
                { kind: "field", fieldId: "email_address" },
                { kind: "field", fieldId: "password" },
                { kind: "field", fieldId: "remember_me" }
            ]
        }
    ]
}