import {useState, useEffect } from "react"
import axios from "axios"
import Link from 'next/link'
import "../../styles/externalPros.css"

const ExternalPros = () => {

    const [externalPros, setExternalPros] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get('/api/external-professionals')
        .then((res) => {
            setExternalPros(res.data)
        })
        .catch(err => {
            setError("Une erreur s’est produite lors de la récupération des professionnels externes.", err)
         })
    }, []) 

    return (

        <div className="section-external-pros">
            <h2>Nos partenaires</h2>
            <section className="container-external-pros">
                {externalPros.length > 0 && (
                    externalPros.map((pro, index) => {

                        return (
                            <div key={pro.id || index}>
                                <Link href={pro.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="card-external-pros"
                                      aria-label="Visiter le site des professionnels (s'ouvre dans un nouvel onglet)"
                                >
                                    <div className="container-card-infos-pros">
                                        <img src={`${pro.picture}`} className='img-external-pros' alt={pro.name}/>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                )}
                {error && <div className="error-message">{error}</div>}
            </section>
        </div>
    )
}

export default ExternalPros