'use client'
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
const token = Cookies.get('token')
import { addInformation, displayCategories } from "@/api/HealthInformations"
import AddHealthInformationsForm from "@/components/Admin/Forms/AddHealthInformationsForm"
import Modal from "@/components/Modal"

export default function AddInformations() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [error, setError] = useState("")

    const [openAddInformationModal, setOpenAddInformationModal] = useState(false)
  
    const handleCloseModal = () => {
        setOpenAddInformationModal(false)
    }

    useEffect(() => {
        displayCategories()
        .then((res)=>{
            setCategory(res.data.result)
        })
        .catch(err => {
            setError(err, "Erreur lors du chargement des catégories")
        })
    }, [])

    const saveInformation = (datas, token) => {
        addInformation(datas, token)
        .then((res) => {
            if(res.status === 201) {
                setTitle("")
                setDescription("")
                setLink("")
                
                setOpenAddInformationModal(true)
                setTimeout(() => {
                  handleCloseModal()
                }, 5000)
            }
        })
        .catch(err => {
            if (err.message === "Titre invalide") {
                setError(err.message)
            }
            
            if (err.message === "Description invalide") {
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
        formData.append('description', description)
        formData.append('link', link)
        formData.append('category', selectedCategory)

        if(image) {
          formData.append('picture', image)
        }

        console.log("formData", formData)
        saveInformation(formData, token)
      }
    
    return (
        <>
            <section className="form-container">
                <h1>Ajouter une information</h1>
                <p className="required-p">Les champs suivis d&apos; un <span className="required-asterisk">*</span> sont obligatoires.</p>
                <AddHealthInformationsForm
                    title={title}
                    description={description}
                    image={image}
                    link={link}
                    categoriesList={category}

  
                    onChangeTitle={setTitle}
                    onChangeDescription={setDescription}
                    onChangePicture={setImage}
                    onChangeLink={setLink}
                    onChangeCategory={setSelectedCategory}
                    handleSubmit={handleSubmit}
                />
                {error && <div className="error-message">{error}</div>}
                <Modal open={openAddInformationModal} onClose={handleCloseModal} message="Information ajoutée" />
            </section>
      </>
  )
}

