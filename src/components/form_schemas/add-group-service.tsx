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

export const addGroupServiceFormSchema : any = (contactGroupOptions: SelectOption[]): any => (
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
        service_name: {
            id: "service_name",
            label: "Service Name",
            renderer: "text",
            placeholder: "Service Name",
            rules: { required: "Service name is required" }
        }
    },
    layout: [
        {
            kind: "stack",
            spacing: "md",
            children: [
                { kind: "field", fieldId: "contact_group_id" },
                { kind: "field", fieldId: "service_name" }
            ]
        }
    ]
})