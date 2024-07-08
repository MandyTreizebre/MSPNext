'use client'
import "@/styles/footer.css"
import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <nav className="container-link">
                <Link href="/" aria-label="Page d'accueil">Accueil</Link>
                <Link href="/decouvrir-notre-msp" aria-label="Page msp">Notre MSP</Link>
                <Link href="/informations-sante"aria-label="Pagez informations santé">Informations santé</Link>
                <Link href="/contact"aria-label="Page contact">Contact</Link>
                <Link href="/professionnels-gardes-urgences"aria-label="Page des urgences et des gardes">Urgences et gardes</Link>
                <Link href="/mentions-legales"aria-label="Page des mentions legales">Mentions légales</Link>
                <Link href="/politique-confidentialite"aria-label="Politique de confidentialité">Politique de confidentialité</Link>
            </nav>
            <div className="container-copyright">
                <p>© 2024 - Maison de Santé de Varennes-Sur-Allier</p>
            </div>
        </footer>
    )
}

export default Footer