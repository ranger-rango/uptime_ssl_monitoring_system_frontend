
export const createContactGroupFormSchema : any = {
    id : "create-contact-group-form",
    meta : {
        title : "Create Contact Group",
        subtitle : "Create a new group."
    },
    fields : {
        group_name: {
            id: "group_name",
            label: "Group Name",
            renderer: "text",
            placeholder: "Company X Service",
            rules: { required: "Group name is required" }
        },
        description: {
            id: "description",
            label: "Description",
            renderer: "textarea",
            props: {
                minRows: 4
            },
            placeholder: "Service testing group",
            rules: { required: "Description is required" }
        }
    },
    layout: [
        {
            kind: "stack",
            spacing: "md",
            children: [
                { kind: "field", fieldId: "group_name" },
                { kind: "field", fieldId: "description" }
            ]
        }
    ]
}