import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons' 
import "@/styles/professionals-admin.css" 

const ProfessionalsAdmin = ({ professionals, onChangeStatus }) => {
    // Groupement des professionnels par nom et prénom - Création d'un objet unique pour chaque professionnel avec leurs coordonnées et horaires
    const groupedProfessionals = professionals.reduce((grouped, professional) => {
        const key = `${professional.lastname} ${professional.firstname}` 

        // Initialiser les structures pour un nouveau professionnel
        if (!grouped[key]) {
            grouped[key] = {
                coordinates: {}, // Objet pour stocker les coordonnées une seule fois
                schedules: {},   // Objet pour stocker les horaires par jour
            } 
        }

        // Groupement des horaires par jour
        const dayKey = professional.day_name 
        if (!grouped[key].schedules[dayKey]) {
            grouped[key].schedules[dayKey] = [] 
        }

        grouped[key].schedules[dayKey].push(professional) 

        // Stocker les coordonnées une seule fois
        if (!grouped[key].coordinates.address) {
            grouped[key].coordinates.id = professional.id 
            grouped[key].coordinates.address = professional.address 
            grouped[key].coordinates.zip = professional.zip 
            grouped[key].coordinates.city = professional.city 
            grouped[key].coordinates.phone = professional.phone 
            grouped[key].coordinates.details = professional.details 
            grouped[key].coordinates.isActive = professional.isActive 
        }
        return grouped 
    }, {}) 

    return (
        <section className='section-professionals-admin'>
            {Object.keys(groupedProfessionals).map((key) => (
                <div key={key} className="container-professionals-admin">
                    <div className="box-professional">
                        <h4> <FontAwesomeIcon icon={faUser} className="icon-admin" />{key}</h4>
                        <div className='actions-professionals'>
                            {/*<Link to={`/editer/professionnel/${groupedProfessionals[key].coordinates.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className="icon-admin" />
                                Modifier le professionnel
                            </Link>
                            <Link to={`/editer/horaires-professionnel/${groupedProfessionals[key].coordinates.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className="icon-admin" />
                                Modifier les horaires du professionnel
                            </Link>*/}
                            <button onClick={() => { onChangeStatus(groupedProfessionals[key].coordinates.id) }}>
                                {groupedProfessionals[key].coordinates.isActive ? "Désactiver" : "Activer"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    ) 
}

export default ProfessionalsAdmin 
