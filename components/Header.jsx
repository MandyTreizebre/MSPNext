'use client'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect } from 'react' 
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
import { useSelector, useDispatch } from 'react-redux' 
import { selectAdmin, logoutAdmin } from '../slices/adminSlice' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faGear, faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons' 
import Logo from '../public/images/logo.png'
import "@/styles/header.css" 

const Header = () => {
    const { isLogged } = useSelector(selectAdmin) 
    const dispatch = useDispatch() 
    const [navIsOpen, setNavIsOpen] = useState(false) // État pour le menu mobile
    const [isOpen, setIsOpen] = useState(false) // État pour le menu déroulant "Offre de soins"
    const [specializations, setSpecializations] = useState([]) // Stocke les spécialisations récupérées depuis l'API
    const router = useRouter() // Permet de gérer la navigation programmatique (ex: redirection après déconnexion)
    const dropdownRef = useRef(null) // Référence du menu déroulant

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    /* Récupération des spécialisations pour le menu déroulant */
    useEffect(() => {
        axios.get('/api/specializations') // Requête GET à l'API pour récupérer les spécialisations
        .then((res) => {
            setSpecializations(res.data) // Stocke les spécialisations dans le state 
        })
        .catch(err => {
           setError("Une erreur s’est produite lors de la récupération des spécialisations.", err)
        })
    }, []) 
    

    /* Fonction pour la déconnexion d'un administrateur */
    const handleLogout = () => {
        axios.get('/api/admin/logout', { // Envoi d'une requpete de déconnexion à l'API
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) { // Si le déco est réussit 
                    dispatch(logoutAdmin()) // Mise à jour Redux pour déconnecter l'admin 
                    router.push('/') // Redirige vers la page d'accueil
                }
            })
            .catch(err => {
                console.error("Erreur lors de la déconnexion:", err) 
            }) 
    } 

    /* Fonction pour gérer l'ouverture et la fermeture du menu mobile */
    const toggleMenu = () => {
        setNavIsOpen(open => !open)// Inverse l'état actuel du menu (true <-> false)
    } 

    /* Fonction pour ouvrir / fermer le menu déroulant  */
    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    /* Fonction pour fermer le menu déroulant après un clic */
    const closeDropdown = () => {
        setIsOpen(false)
    }



    return (
        <header>
            <section className='container-header'>
                <div>
                    <Link href="/" aria-label="Visiter la page d'accueil de la Maison de santé de Varennes-Sur-Allier">
                            <Image src={Logo} alt="Logo de la Maison de santé de Varennes-Sur-Allier" width={85} height={85}/>
                    </Link>
                </div>

                {/* icône du menu pour mobile et tablette */}
                <button id="mobile-tablet-trigger" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} className="trigger-icon" />
                </button>

                <nav className={`navigation ${navIsOpen ? "is-open" : ""}`}>
                    <Link href="/" className="link-nav">Accueil</Link>

                    <div className='dropdown' ref={dropdownRef}>
                        <button className="dropdown-button" onClick={toggleDropdown}>
                            <p>Offre de soins <FontAwesomeIcon icon={faChevronDown} className={`dropdown-icon ${isOpen ? 'rotate' : ''}`} /></p>
                        </button>

                        <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
                            {specializations.length > 0 ? (
                                specializations.map((spe) => (
                                    <li key={spe.id} onClick={closeDropdown}>
                                        <Link href={`/professionnels/${spe.id}`} aria-label={`Voir la spécialité ${spe.name_spe}`}>
                                            {spe.name_spe}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>Chargement...</li>
                            )}
                        </ul>
                    </div>

                    <Link href="/informations-sante" className="link-nav">Informations santé</Link>

                    <Link href="/contact" className="link-nav">Contact</Link>

                    <Link href="/gardes-urgences" className="link-nav urgent-link">Urgences et gardes</Link>

                    {/*{isLogged ? (
                        <>
                        <Link href="/admin">Portail Admin</Link>
                            <button onClick={handleLogout} className='logout-button'>Se déconnecter</button>
                        </>
                    ) : (
                        <Link href="/login"
                        aria-label="Page de connexion"
                        className={pathname === "/login" ? "active" : ""}
                        >
                            <FontAwesomeIcon icon={faGear} title="Administration" />
                        </Link>
                    )}*/}
                </nav>
            </section>
        </header>
    ) 
} 


export default Header 
