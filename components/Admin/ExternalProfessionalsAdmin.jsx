import Link from 'next/link'
import { useState } from "react" 
import Cookies from 'js-cookie' 
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons' 
import Modal from "../Modal" 
import "@/styles/external-professionals-admin.css" 

const ExternalProfessionalsAdmin = ({ externalProfessionals, setExternalProfessionals }) => {
  // États pour la gestion du modal et des erreurs
  const [openDeleteExternalProModal, setOpenDeleteExternalProModal] = useState(false) 
  const [error, setError] = useState(null) 

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setOpenDeleteExternalProModal(false) 
  } 

  // Fonction pour supprimer un professionnel externe
  const onClickDeleteExtPro = (id) => {
    const token = Cookies.get('token') 
    axios.delete(`/api/external-professionals/delete/${id}`, { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setOpenDeleteExternalProModal(true) 
          setTimeout(() => {
            handleCloseModal() 
          }, 5000) 
          // Mise à jour de la liste des professionnels après suppression
          setExternalProfessionals(prev => prev.filter(pro => pro.id !== id)) 
        }
      })
      .catch((error) => {
        setError("Problème lors de la suppression du professionnel externe", error) 
      }) 
  } 

  return (
    <section className='section-external-pro'>
      {externalProfessionals.map((extPro) => (
        <div key={extPro.id} className='bloc-external-pro'>
          <h4>{extPro.name}</h4>
          <div className='actions-admin'>
            <Link href={`/admin/professionnels-externes/editer/${extPro.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} className="icon-admin" />
              Modifier le professionnel
            </Link>
            <button onClick={() => onClickDeleteExtPro(extPro.id)}>
              Supprimer le professionnel
            </button>
          </div>
        </div>
      ))}
      <Modal open={openDeleteExternalProModal} onClose={handleCloseModal} message="Professionnel externe supprimé" />
      {error && <div className="error-message">{error}</div>}
    </section>
  ) 
} 

export default ExternalProfessionalsAdmin 
