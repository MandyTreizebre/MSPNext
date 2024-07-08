'use client'
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getInformationsByCategory } from "@/api/HealthInformations"
import InformationsContainer from "../../../components/InformationsContainer"

const InformationsByCategory = () => {

    const {category} = useParams()
    const [categoryData, setCategoryData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (category) { 
            console.log("Fetching data for category:", category)
            getInformationsByCategory(category)
                .then(res => {
                    console.log("res.data.result dans getInformationsBYCategory", res.data.result)
                    setCategoryData(res.data.result)
                })
                .catch(err => {
                    console.error("Error fetching data:", err)
                    setError("Une erreur s'est produite lors de la récupération des informations.", err)
                })
        }
    }, [category])

    console.log("categoryData dans InformationsBYCategory", categoryData)

    if (error) {
        return <div className="error-message">{error}</div>
    }

    if (!categoryData) {
        return <div>Chargement...</div>
    }

    return (
        <section>
            <InformationsContainer informations={categoryData} />
        </section>
    )
}

export default InformationsByCategory
