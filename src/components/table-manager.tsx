import { useState } from "react"
import ModalComponent from "./modal-componet"
import RenderTable from "./table-renderer"
import useFetchData from "./use-fetch-data"
import DrillDownDashboard from "./dashboard-drill-down"
import ViewGroupServicesPage from "@/pages/view-group-services"
import ViewGroupMembersPage from "@/pages/view-group-members"

interface TableManagerProps
{
    url : string
    authToken : string
    ColHeaders : any[]
    singlePageUrl ?: string
    table ?: string
    sorts ?: { column: string; order: string }[]
    filters ?: { column: string; relation: string; filt_value: string }[]
}

export default function TableManager( { url , authToken, ColHeaders, table } : TableManagerProps)
{
    const { data, isLoading, error } = useFetchData(url, authToken)

    const [serviceModalVisible, setServiceModalVisible] = useState(false)
    const [selectedServicedRow, setSelectedServicedRow] = useState<any>(null)

    const [groupInfoModalVisible, setGroupInfoModalVisible] = useState(false)
    const [selectedGroupRow, setSelectedGroupRow] = useState<any>(null)

    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>Error: {error.message} </p>


    const rowClick : any = (row : any) => 
    {
        if (table === "SERVICES")
        {
            setServiceModalVisible(true)
            setSelectedServicedRow(row)
        }

        if (table === "GROUPS")
        {
            setGroupInfoModalVisible(true)
            setSelectedGroupRow(row)
        }
    }

    const closeModalHandler : any = () => 
    {
        if (table === "SERVICES")
        {
            setServiceModalVisible(false)
            setSelectedServicedRow(null)
        }
        if (table === "GROUPS")
        {
            setGroupInfoModalVisible(false)
            setSelectedGroupRow(null)
        }

    }

    return (
        <>
            <RenderTable colHeaders={ColHeaders} tableData={data} onRowClick={rowClick} />

            { serviceModalVisible && selectedServicedRow &&
                <ModalComponent htmlElements={
                        <>
                            <DrillDownDashboard serviceId={selectedServicedRow.service_id} />
                        </>
                    }
                    onClose={closeModalHandler}
                    title={`${selectedServicedRow.service_name} Statistics`}
                />
            }

            { groupInfoModalVisible && selectedGroupRow &&
                <ModalComponent htmlElements={
                        <>
                            <div className="group-info-divs">
                                <h4>Services</h4>
                                <ViewGroupServicesPage groupId={selectedGroupRow.contact_group_id} />
                            </div>
                            <div className="group-info-divs">
                                <h4>Members</h4>
                                <ViewGroupMembersPage groupId={selectedGroupRow.contact_group_id} />
                            </div>
                        </>
                    }
                    onClose={closeModalHandler}
                    title={`${selectedGroupRow.group_name}`}
                />
            }

        </>
    )
}