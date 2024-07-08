import {useState, useEffect, useRef} from "react"
import Link from 'next/link'
import { config } from "@/config"
import {displaySpecializations} from '../../api/Professionals'
import "../../styles/specializations.css"

const Specializations = () => {

    const refSpe = useRef(null) 
    const [specializations, setSpecializations] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        displaySpecializations()
        .then((res) => {
            setSpecializations(res.data.result) 
        })
        .catch(err => {
        console.log("err dans la récupération des spécialisations", err)
           setError("Une erreur s’est produite lors de la récupération des spécialisations.", err)
        })
    }, []) 

    return ( 

        <div id="specializations" className="container-spe" ref={refSpe}>
            <h2>Les professionnels de santé de la MSP</h2>
            <section className="section-spe">
                {specializations.map((spe, index)=>{
                    return (
                        <div key={index} className="cards-spe"> 
                            <Link href={`professionnels/${spe.id}`} 
                                  aria-label={`Visiter la page des ${spe.name_spe}`}
                            >
                                <img src={config.pict_url+spe.picture} className="img-spe" alt={spe.name_spe}/>
                                <p>{spe.name_spe}</p>
                            </Link>
                        </div>
                    )
                })}
                {error && <div className="error-message">{error}</div>}
            </section>
        </div>
    )
}

export default Specializations