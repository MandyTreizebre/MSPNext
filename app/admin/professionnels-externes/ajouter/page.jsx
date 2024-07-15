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
	const [picture, setPicture] = useState(null)
	const [error, setError] = useState(null)
	const [openAddExternalProModal, setOpenAddExternalProModal] = useState(false)

	const handleCloseModal = () => {
		setOpenAddExternalProModal(false)
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
					setPicture(null)
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

	const handleSubmit = () => {
		const formData = new FormData()
		formData.append('name', name)
		formData.append('link', link)
		if(picture) {
			formData.append('picture', picture)
		}

		saveExternalPro(formData, token)
	}

	return (
		<>
			<section className="form-container">
				<h1>Ajouter un professionnel externe</h1>
				<p className="required-p">Les champs suivis d&apos;un <span className="required-asterisk">*</span> sont obligatoires.</p>
				<AddExternalProForm
				name={name}
				link={link}
				picture={picture}

				onChangeName={setName}
				onChangeLink={setLink}
				onChangePicture={setPicture}
				handleSubmit={handleSubmit}
				/>

				{error && <div className="error-message">{error}</div>}
				<Modal open={openAddExternalProModal} onClose={handleCloseModal} message="Professionnel ajouté" />
			</section>
		</>
	)
}

export default AddExternalPros