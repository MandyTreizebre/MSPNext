'use client'
import {useState, useEffect} from "react"
import Link from "next/link"
import { displayCategories } from "@/api/HealthInformations"
import { config } from "@/config"
import "./categories-informations.css"

export default function CategoriesInformations() {

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        displayCategories()
        .then((res) => {
             setCategories( res.data.result )
        })
        .catch(err => {
            setError("Une erreur s’est produite lors de la récupération des catégories.", err)
         })
    }, [])

    return (
        <section className="container-categories">
            <h1>Informations santé</h1>
            <p>Bienvenue dans notre espace dédié à la santé, où nous vous offrons une mine précieuse d&apos;informations pour vous guider vers un mode de vie sain et équilibré. Explorez nos catégories variées, allant de la nutrition et de l&apos;activité physique au bien-être mental et aux conseils pratiques. Notre objectif est de fournir des ressources informatives et inspirantes qui favorisent la compréhension de votre bien-être global. Plongez dans des sujets tels que la gestion du stress, des recettes nutritives, des routines d&apos;entraînement adaptées, et bien plus encore. Nous croyons que l&apos;accès à des informations éclairées peut être le premier pas vers des choix de vie plus sains. Que vous cherchiez des conseils pour un mode de vie actif, des informations sur des conditions spécifiques, ou simplement des astuces pour rester en forme, vous trouverez ici un compagnon fiable pour votre parcours vers une meilleure santé.</p>
            
            <div className="container-category-informations">
                {categories.map((item)=>(
                    <section className="cards-category-informations">
                            <Link key={item.id}
                                href={`/informations-sante/${item.id}`}
                                aria-label="Visiter la page des informations santé"
                            >
                                <img src={config.pict_url+item.picture} className="category-picture" alt={item.name}/>
                            </Link>
                            <h3>{item.name}</h3>
                    </section>
                ))}
                {error && <div className="error-message">{error}</div>}
            </div>
        </section>
    )
}