'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getProfessionalBySpe } from "@/api/Professionals"
import ProfessionalsContainer from "@/components/ProfessionalsContainer"
import "./professionals.css"
import Image from "next/image"



export default function HealthProfessionals () {

    const [professionals, setProfessionals] = useState([])
    const [error, setError] = useState(null)
    const { speciality_id } = useParams()

    useEffect(() => {
        getProfessionalBySpe(speciality_id)
        .then((res) => {
            setProfessionals(res.data.result)
        })
        .catch(err => {
            setError("Echec lors du changement des professionnels", err)
        })
    }, [speciality_id])

    return (
        <>
            {/* Section to display the title and a paragraph */}
            <section className="container-pros">

                <section className="container-section-top">
                    <div className="container-imgs-pros">
                        <div className="column-left-img-pros">
                            <Image src="/images/bureau-psychologue.jpg" className="img-professional-left" width={200} height={200}/>
                            <Image src="/images/cabinetkines.jpg" className="img-professional-left-resize" width={200} height={200}/>
                        </div>
                        <div className="column-right-img-pros">
                            <Image src="/images/cabmedecins.jpg" className="img-professional-right-resize" width={200} height={200}/>
                            <Image src="/images/pharmacie-beauvy.jpg" className="img-professional-right" width={200} height={200}/>
                        </div>
                    </div>

                    <div className="section-presentation-pros">
                        <h1>Retrouvez vos professionnels de santé</h1>
                        <p> Que ce soit pour une consultation médicale, un suivi régulier, ou tout autre besoin de santé, vous trouverez ici les informations nécessaires pour planifier votre visite.
                            Pour fixer un rendez-vous, veuillez utiliser les coordonnées fournies pour chaque professionnel de santé. Cliquez sur le numéro de téléphone pour une prise de rendez-vous rapide et efficace.
                        </p>
                        <strong>En cas d&apos;urgence médicale nécessitant une assistance immédiate, veuillez composer le 15.</strong>
                    </div>

                </section> 
                    
            </section>

            <ProfessionalsContainer professionals={professionals} />
            {error && <div className="error">{error}</div>}
        </>
    )
}
