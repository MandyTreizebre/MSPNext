'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react' 
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
import { useSelector, useDispatch } from 'react-redux' 
import { selectAdmin, logoutAdmin } from '../slices/adminSlice' 
import { toggleDarkMode, selectIsDarkMode } from "../slices/darkModeSlice" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faGear, faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons' 
import Logo from '../public/images/logo.png'
import "@/styles/header.css" 

const Header = () => {
    const { isLogged } = useSelector(selectAdmin) 
    const isDarkMode = useSelector(selectIsDarkMode) 
    const dispatch = useDispatch() 
    const refSpe = useRef(null) 
    const [navIsOpen, setNavIsOpen] = useState(false)
    const router = useRouter()

    const pathname = typeof window === "undefined" ? "" : location.pathname

    const handleLogout = () => {
        axios.get('/api/admin/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch(logoutAdmin())
                    router.push('/')
                }
            })
            .catch(err => {
                console.error("Erreur lors de la déconnexion:", err) 
            }) 
    } 

    const toggleMenu = () => {
        setNavIsOpen(open => !open) 
    } 

    return (
        <header>
            <div className="dark-mode-toggle-container">
                <div
                    className={`dark-mode-switch ${isDarkMode ? 'dark' : ''}`}
                    onClick={() => dispatch(toggleDarkMode())}
                    title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
                >
                    {isDarkMode ? (
                        <FontAwesomeIcon icon={faSun} className="icon-light" />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} className="icon-dark" />
                    )}
                </div>
            </div>

            <section className='container-header'>
                <div>
                    <Link href="/" aria-label="Visiter la page d'accueil de la Maison de santé de Varennes-Sur-Allier">
                            <Image src={Logo} alt="Logo de la Maison de santé de Varennes-Sur-Allier" width={85} height={85}/>
                    </Link>
                </div>

                <button id="mobile-tablet-trigger" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} className="trigger-icon" />
                </button>

                <nav className={`navigation ${navIsOpen ? "is-open" : ""}`}>
                    <Link href="/">Accueil</Link>

                    <Link href="#specializations"
                    onClick={() => refSpe?.current?.scrollIntoView()}
                            aria-label="Parcourir les spécialisations"
                            className={pathname === "/#specializations" ? "active" : ""}
                    >
                        Rendez-vous
                    </Link>

                    <Link href="/informations-sante">Informations santé</Link>

                    <Link href="/contact">Contact</Link>

                    <Link href="/gardes-urgences">Urgences et gardes</Link>

                    {isLogged ? (
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
                    )}
                </nav>
            </section>
        </header>
    ) 
} 

export default Header 
