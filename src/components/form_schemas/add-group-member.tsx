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

export const addGroupMemberFormSchema  : any = (contactGroupOptions: SelectOption[]): any => (
{
    id : "create-contact-group-form",
    meta : {
        title : "Create Contact Group",
        subtitle : "Create a new group."
    },
    fields : {
        contact_group_id: {
            id: "contact_group_id",
            label: "Contact Groups",
            renderer: "select",
            placeholder: "Select Contact Groups",
            props: {
                data: contactGroupOptions
            },
            rules: { required: "Please select a contact group" }
        },
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
        }
    },
    layout: [
        {
            kind: "stack",
            spacing: "md",
            children: [
                { kind: "field", fieldId: "contact_group_id" },
                { kind: "field", fieldId: "email_address" }
            ]
        }
    ]
})