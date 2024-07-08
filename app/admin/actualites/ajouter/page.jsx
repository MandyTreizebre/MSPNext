'use client'
import { useState } from "react"
import Cookies from 'js-cookie'
const token = Cookies.get('token')
import { addNew } from "@/api/News"
import AddNewsForm from "@/components/Admin/Forms/AddNewsForm"
import Modal from "@/components/Modal"

export default function AddNews() {

    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [picture, setPicture] = useState(null)
    const [external_link, setExternal_link] = useState("")
    const [error, setError] = useState("")
    const [openAddNewModal, setOpenAddNewModal] = useState(false)
  
    const handleCloseModal = () => {
        setOpenAddNewModal(false)
    }

    const saveNew = (datas, token) => {
        addNew(datas, token)
            .then((res)=> {
                if(res.status === 201) {
                    setTitle("")
                    setDetails("")
                    setExternal_link("")
                    setPicture(null)
                    setError("")
                    setOpenAddNewModal(true)
                    setTimeout(()=>{
                        handleCloseModal()
                    }, 5000)
                }
            })
            .catch(err=>{
                if (err.message === "Titre invalide") {
                    setError(err.message)
                }
            
                if (err.message === "Description invalide") {
                    setError(err.message)
                }

                if (err.message === "Image invalide") {
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
        formData.append('title', title)
        formData.append('details', details)
        formData.append('external_link', external_link)
        if(picture) {
            formData.append('picture', picture)
        }

        saveNew(formData, token)
    }


    return (
        <>
            <section className="form-container">
                <h1>Ajouter une actualité</h1>
                <p className="required-p">Les champs suivis d&apos;un <span className="required-asterisk">*</span> sont obligatoires.</p>
                <AddNewsForm
                    title={title}
                    details={details}
                    external_link={external_link}
                    picture={picture}

                    onChangeTitle={setTitle}
                    onChangeDetails={setDetails}
                    onChangeExternalLink={setExternal_link}
                    onChangePicture={setPicture}
                    handleSubmit={handleSubmit}
                />
                {error && <div className="error-message">{error}</div>}
                <Modal open={openAddNewModal} onClose={handleCloseModal} message="Actualité ajoutée" />
            </section>
        </>
    )
}
