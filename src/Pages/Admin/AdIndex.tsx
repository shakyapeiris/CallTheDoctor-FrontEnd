import React from 'react'
import { useParams } from 'react-router'
import AdminIndex from '../../Components/Admin/Index/Aindex'

function Index() {
    const {adminId} = useParams<{adminId: string}>()
    return (
        <div>
            <AdminIndex adminId={adminId} />
        </div>
    )
}

export default Index
