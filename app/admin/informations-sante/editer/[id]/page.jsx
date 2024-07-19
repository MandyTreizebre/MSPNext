'use client'
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import Cookies from 'js-cookie' 
import axios from "axios"
const token = Cookies.get('token') 
import EditHealthInformationsForm from "@/components/Admin/Forms/EditHealthInformationsForm"
import Modal from "@/components/Modal"

const EditInformations = () => {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [pictureUrl, setPictureUrl] = useState(null)
    const [existingPictureUrl, setExistingPictureUrl] = useState(null)

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const [error, setError] = useState("")
    const [openEditInformationModal, setOpenEditInformationModal] = useState(false) 

    const handleCloseModal = () => {
        setOpenEditInformationModal(false) 
    }  

    useEffect(() => {
        axios.get(`/api/informations/by-id/${id}`)
        .then((res) => {
            if(res.data && res.data.length > 0) {
                const data = res.data[0] 
                setTitle(data.title) 
                setDescription(data.description) 
                setLink(data.link) 
                setExistingPictureUrl(data.picture)
                setSelectedCategory(data.category)       
            }
        })
        .catch((err) => {
            setError("Erreur lors de la récupération de l'information", err) 
        })
    }, [id])


    useEffect(() => {
        axios.get(`/api/categories-informations`)
            .then((res) => {
                setCategories(res.data) 
            })
            .catch((err) => {
                setError("Erreur lors de la récupération des catégories", err) 
            }) 
    }, []) 

    const editInformation = (datas, token) => {
        axios.put(`/api/informations/edit/${id}`, datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
            .then((res) => {
                if(res.status === 200) {
                    setError("")
                    setOpenEditInformationModal(true) 
                    setTimeout(() => {
                        handleCloseModal() 
                    }, 5000) 
                } else {
                    setError("Echec Envoi") 
                }
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.msg) {
                    setError(err.response.data.msg);
                } else {
                    setError("Une erreur est survenue");
                }
            })
    }

    const handleSubmit = () => {
        const formData = new FormData() 
        formData.append('title', title || "") 
        formData.append('description', description || "") 
        formData.append('link', link || "") 
        formData.append('category', selectedCategory || "") 

        if (pictureUrl) {
            formData.append('pictureUrl', pictureUrl);
        } else {
            formData.append('existingPictureUrl', existingPictureUrl)
        }

        editInformation(formData, token) 
    
    } 

    return (
        <>
            <section className="form-container">
                <h1>Modifier une information</h1>
                <EditHealthInformationsForm
                    title={title}
                    description={description}
                    link={link}
                    categoriesList={categories}
                    selectedCategory={selectedCategory}

                    onChangeTitle={setTitle}
                    onChangeDescription={setDescription}
                    onChangePicture={setPictureUrl}
                    onChangeLink={setLink}
                    onChangeCategory={setSelectedCategory}
                    handleSubmit={handleSubmit}
                />
                {error && <div className="error-message">{error}</div>}
                <Modal open={openEditInformationModal} onClose={handleCloseModal} message="Information modifiée" />
            </section>
        </>
    ) 
} 

export default EditInformations 
