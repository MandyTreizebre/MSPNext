import Link from "next/link";
import "../styles/informationsContainer.css";

const InformationsContainer = ({ informations }) => {
    return (
        <>
            {informations.map((info) => (
                <section key={info.id} className="section-informations">
                    <img
                        src={info.picture}
                        alt={info.title}
                        className="pict-information"
                    />
                    <div className="info">
                        <h2>{info.title}</h2>
                        <p>{info.description}</p>
                        <Link href={info.link}
                            className="button-informations"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visiter le site officiel (s'ouvre dans un nouvel onglet)"
                        >
                            Lire la suite
                        </Link>
                    </div>
                </section>
            ))}
        </>
    );
}

export default InformationsContainer;
