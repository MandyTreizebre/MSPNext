'use client'
import { useState} from "react"
import axios from 'axios'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
import AddExternalProForm from "@/components/Admin/Forms/AddExternalProForm"
import Modal from "@/components/Modal"

const AddExternalPros = () => {

	const [name, setName] = useState("")
	const [link, setLink] = useState("")
	const [pictureUrl, setPictureUrl] = useState(null)
	const [error, setError] = useState(null)
	const [openAddExternalProModal, setOpenAddExternalProModal] = useState(false)

	const handleCloseModal = () => {
		setOpenAddExternalProModal(false)
	}

	const handleSubmit = () => {
        if (!name || !link) {
            setError("Tous les champs sont obligatoires") 
            return 
        }

        const formData = new FormData() 
        formData.append('name', name) 
        formData.append('link', link) 
        formData.append('pictureUrl', pictureUrl) 

        saveExternalPro(formData, token) 
    } 

	const saveExternalPro = (datas, token) => {
        axios.post('/api/external-professionals', datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
			.then((res)=> {
				if(res.status === 201) {
					setName("")
					setLink("")
					setPictureUrl("")
					setError(null)
					setOpenAddExternalProModal(true)
					setTimeout(()=>{
						handleCloseModal()
					}, 5000)
				}
			})
			.catch(err=>{
				if (err.message === "Nom invalide") {
					setError(err.message)
				}
				
				if (err.message === "Prénom invalide") {
					setError(err.message)
				}
				
				if (err.message === "Lien invalide") {
					setError(err.message)
				}

				if (err.message === "") {
					setError("Une erreur est survenue")
				}
			})
	}

	return (
		<>
			<section className="form-container">
				<h1>Ajouter un professionnel externe</h1>
				<p className="required-p">Les champs suivis d&apos;un <span className="required-asterisk">*</span> sont obligatoires.</p>
				<AddExternalProForm
				name={name}
				link={link}
				pictureUrl={pictureUrl}

				onChangeName={setName}
				onChangeLink={setLink}
				onChangePicture={setPictureUrl}
				handleSubmit={handleSubmit}
				/>

				{error && <div className="error-message">{error}</div>}
				<Modal open={openAddExternalProModal} onClose={handleCloseModal} message="Professionnel ajouté" />
			</section>
		</>
	)
}

export default AddExternalPros