import Link from 'next/link'
import imgNotFound from "../../src/assets/images/not-found.jpg"
import "../styles/notFound.css"

const NotFound = () => {

    return (
        <div className="container-not-found">
            <img src={imgNotFound} alt="illustration d'un 404" id="img-404"/>
            <h1>Page non trouvée</h1>
            <p>Nous sommes désolés, la page demandée n&apos;a pu être trouvée, veuillez retourner à la page d&apos;accueil</p>
            {/*<Link 
                to="/"
                aria-label="Retourner à la page d'accueil"
            >
                Retourner à la page d&apos;accueil
            </Link>*/}
        </div>
    ) 
}
export default NotFound