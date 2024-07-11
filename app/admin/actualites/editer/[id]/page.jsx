'use client' 
import { useState, useEffect } from "react" 
import { useParams } from 'next/navigation' 
import Cookies from 'js-cookie'
const token = Cookies.get('token') 
import axios from "axios" 
import EditNewsForm from "@/components/Admin/Forms/EditNewsForm" 
import Modal from "@/components/Modal" 

const EditNews = () => {
    const { id } = useParams() 
    const [title, setTitle] = useState("") 
    const [details, setDetails] = useState("") 
    const [picture, setPicture] = useState(null) 
    const [externalLink, setExternalLink] = useState("") 
    const [existingImage, setExistingImage] = useState("") 
    const [error, setError] = useState(null) 
    const [openEditNewModal, setOpenEditNewModal] = useState(false) 

    const handleCloseModal = () => {
        setOpenEditNewModal(false)  
    }  

    useEffect(() => {
        axios.get(`/api/news/by-id/${id}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    const data = res.data[0] 
                    setTitle(data.title) 
                    setDetails(data.details) 
                    setExternalLink(data.external_link) 
                    setExistingImage(data.image) 
                }
            })
            .catch((err) => {
                setError("Erreur lors de la récupération de l'actualité", err) 
            }) 
    }, [id]) 

    const editNew = (datas, token) => {
        axios.put(`/api/news/edit/${id}`, datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
            .then((res) => {
                if (res.status === 200) {
                    setOpenEditNewModal(true) 
                    setTimeout(() => {
                        handleCloseModal() 
                    }, 5000) 
                } else {
                    setError("Echec Envoi") 
                }
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.msg) {
                    setError(err.response.data.msg) 
                } else {
                    setError("Une erreur est survenue") 
                }
            }) 
    } 

    const handleSubmit = () => {
        const formData = new FormData() 
        formData.append('title', title) 
        formData.append('details', details) 
        formData.append('external_link', externalLink) 
        if (picture) {
            formData.append('picture', picture) 
        } else if (existingImage) {
            formData.append('existingImage', existingImage) 
        }

        editNew(formData, token) 
    }  

    return (
        <section className="form-container">
            <h1>Modifier une actualité</h1>
            <EditNewsForm
                title={title}
                details={details}
                externalLink={externalLink}
                onChangeTitle={setTitle}
                onChangeDetails={setDetails}
                onChangeExternalLink={setExternalLink}
                onChangePicture={setPicture}
                handleSubmit={handleSubmit}
            />
            {error && <div className="error-message">{error}</div>}
            <Modal open={openEditNewModal} onClose={handleCloseModal} message="Actualité modifiée" />
        </section>
    ) 
} 

export default EditNews 
