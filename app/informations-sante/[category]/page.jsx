'use client'
import { useParams } from "next/navigation"
import axios from 'axios'
import { useState, useEffect } from "react"
import InformationsContainer from "../../../components/InformationsContainer"

export default function InformationsByCategory() {

    const {category} = useParams()
    const [categoryData, setCategoryData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (category) { 
            axios.get(`/api/informations/${category}`)
                .then(res => {
                    setCategoryData(res.data)
                })
                .catch(err => {
                    console.error("Error fetching data:", err)
                    setError("Une erreur s'est produite lors de la récupération des informations.", err)
                })
        }
    }, [category])

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

