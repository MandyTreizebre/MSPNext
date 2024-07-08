import Link from 'next/link'
import "../../styles/emergencies.css"

const Emergencies = () => {

    return (

        <div className="container-emergencies">
            <section className="section-emergencies">
                <div className="title-emergencies">
                    <h2>Permanence des Soins et Urgences Médicales</h2>
                    <h3 data-aos="zoom-in" data-aos-duration="1500"><em>Des Soins à Tout Moment</em></h3>
                </div>
                
                <p> 
                    L&apos;objectif de la maison de santé est de vous assurer une assistance rapide et efficace lorsque vous en avez le plus besoin.<br />
                    <strong><em>Toutes les urgences restent gérées par le 15.</em></strong>
                </p>

                <Link href="/gardes-urgences" 
                      className="emergencies-button"
                      aria-label="Aller à la page des gardes et des urgences" 
                >   
                    Trouver les professionnels de garde
                </Link>
            </section>
        </div> 
    )
}

export default Emergencies