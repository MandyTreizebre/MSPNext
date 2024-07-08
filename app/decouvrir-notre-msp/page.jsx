'use client'
import Image from 'next/image'
import "./decouvrir-notre-msp.css"
import { Link } from "next/link" 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers, faStethoscope, faHeartbeat} from '@fortawesome/free-solid-svg-icons'

export default function Msp() {

    return (
        <>
            <section>
                <div className='bloc-presentation'>
                    <h1 data-aos="fade-right" data-aos-duration="1500">Notre maison de santé pluriprofessionnelle</h1>
                    <ul>
                        <li data-aos="fade-right" data-aos-duration="1500" data-aos-delay="100">
                            <FontAwesomeIcon icon={faUsers} className="icon-msp"/>
                            Nous réunissons 32 professionnels de santé, y compris médecins, infirmiers, kinésithérapeutes, psychologues, et bien d&apos;autres.
                        </li>
                        <li data-aos="fade-right" data-aos-duration="1500" data-aos-delay="400">
                            <FontAwesomeIcon icon={faStethoscope} className="icon-msp"/>
                            Chaque professionnel apporte une expertise unique, favorisant une approche complète de la santé qui intègre le physique, le mental et le social.
                        </li>
                        <li data-aos="fade-right" data-aos-duration="1500" data-aos-delay="700">
                            <FontAwesomeIcon icon={faHeartbeat} className="icon-msp"/>
                            Notre équipe s&apos;engage à fournir des soins personnalisés, mettant l&apos;accent sur la prévention, le diagnostic précoce et le traitement efficace.
                        </li>
                    </ul>
                    
                </div>
                <div className="download">
                    <a
                        href={"/files/projet_sante.pdf"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        locale={false} 
                        download
                    >
                        <button aria-label="Téléchargez notre projet de santé">
                            Téléchargez notre projet de santé
                        </button>
                    </a> 
                </div>
            </section>

            <section className="container-description-msp">
                <article className="container-article" data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="1500">
                    <h2>Notre ambition</h2>
                    <Image src="/images/equipe-medecins.jpg" className="img-description-msp" alt="Photo d'une équipe de médecin qui joignent leurs mains" width={300} height={200} />
                    <ul>
                        <li>Coordonner les professionnels de santé autour du patient</li>
                    </ul>
                </article>

                <article className="container-article" data-aos="zoom-in" data-aos-delay="1500" data-aos-duration="1500">
                    <h2>Nos principes</h2>
                    <Image src="/images/healthy.jpg" className="img-description-msp" alt="Photo de nourriture saine" width={300} height={200}/>
                    <ul>
                        <li>La prévention bucco-dentaire</li>
                        <li>L&apos;activité physique adaptée</li>
                        <li>La cuisine thérapeutique</li>
                        <li>Un bâtiment écoresponsable</li>
                    </ul>
                </article>

                <article className="container-article" data-aos="zoom-in" data-aos-delay="1800" data-aos-duration="1500">
                    <h2>Notre implication</h2>
                    <Image src="/images/nature.jpg" className="img-description-msp" alt="Photo d'arbres" width={300} height={200} />
                    <ul>
                        <li>Accueillir des étudiants</li>
                        <li>La formation continue</li>
                        <li>Travaux de recherche</li>
                    </ul>
                </article>
            </section>

            <section className="last-container">
                <h2>Lorem ipsum dolor sit amet</h2>
                <Image src="/images/cabmedecin2.jpg" alt="cabinet du docteur Regnier" className="img-office" width={300} height={300}/>
                <p>Notre mission est de créer un environnement où la collaboration interdisciplinaire prospère, garantissant que chaque patient bénéficie de l&apos;expertise variée de notre équipe. Que vous ayez besoin de consultations médicales, de suivi spécialisé, de soins infirmiers, de conseils nutritionnels, ou d&apos;autres services de santé, notre établissement vous offre un éventail complet de soins.
                   Chacun de nos professionnels apporte une expertise unique, contribuant à une approche complète de la santé. Ensemble, nous nous engageons à fournir des soins centrés sur le patient, mettant l&apos;accent sur la prévention, le diagnostic précoce et le traitement efficace.
                </p>
            </section>
        </>
    ) 
}
