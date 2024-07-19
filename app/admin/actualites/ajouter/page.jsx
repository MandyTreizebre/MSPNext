'use client'
import { useState } from "react" 
import Cookies from 'js-cookie' 
import axios from "axios" 
import AddNewsForm from "@/components/Admin/Forms/AddNewsForm" 
import Modal from "@/components/Modal" 

export default function AddNews() {
    const [title, setTitle] = useState("") 
    const [details, setDetails] = useState("") 
    const [pictureUrl, setPictureUrl] = useState("") 
    const [external_link, setExternal_link] = useState("") 
    const [error, setError] = useState("") 
    const [openAddNewModal, setOpenAddNewModal] = useState(false) 
    const token = Cookies.get('token') 

    const handleCloseModal = () => {
        setOpenAddNewModal(false) 
    } 

    const handleSubmit = () => {
        if (!title || !details || !external_link) {
            setError("Tous les champs sont obligatoires") 
            return 
        }

        const formData = new FormData() 
        formData.append('title', title) 
        formData.append('details', details) 
        formData.append('external_link', external_link) 
        formData.append('pictureUrl', pictureUrl) 

        saveNew(formData, token) 
    } 

    const saveNew = (datas, token) => {
        axios.post('/api/news', datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
        .then((res) => {
            if (res.status === 201) {
                setTitle("") 
                setDetails("") 
                setExternal_link("") 
                setPictureUrl("") 
                setError("") 
                setOpenAddNewModal(true) 
                setTimeout(() => {
                    handleCloseModal() 
                }, 5000) 
            }
        })
        .catch(err => {
            setError("Une erreur est survenue") 
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg) 
            }
        }) 
    } 

    return (
        <>
            <section className="form-container">
                <h1>Ajouter une actualité</h1>
                <p className="required-p">Les champs suivis d&apos un <span className="required-asterisk">*</span> sont obligatoires.</p>
                <AddNewsForm
                    title={title}
                    details={details}
                    external_link={external_link}
                    pictureUrl={pictureUrl}
                    onChangeTitle={setTitle}
                    onChangeDetails={setDetails}
                    onChangeExternalLink={setExternal_link}
                    onChangePicture={setPictureUrl}
                    handleSubmit={handleSubmit}
                />
                {error && <div className="error-message">{error}</div>}
                <Modal open={openAddNewModal} onClose={handleCloseModal} message="Actualité ajoutée" />
            </section>
        </>
    ) 
}
