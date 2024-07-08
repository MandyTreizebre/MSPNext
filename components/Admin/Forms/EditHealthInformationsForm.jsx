import { useState } from "react" 
import "@/styles/admin-forms.css" 

const EditHealthInformationsForm = (props) => {
    // États pour les messages d'erreur de validation
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image: "",
        link: ""
    }) 

    // Gestionnaire de changement de valeur pour les champs du formulaire
    const handleInputChange = (setter) => (e) => {
        setter(e.currentTarget.value) 
    } 

    const maxFileSize = 5 * 1024 * 1024  // 5MB

    // Fonction de gestion du changement d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0] 
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'] 
            if (!validTypes.includes(file.type)) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    picture: "Erreur de format d'image, JPEG, JPG et PNG autorisés"
                })) 
            } else if (file.size > maxFileSize) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    picture: "La taille du fichier dépasse la limite de 5MB"
                })) 
            } else {
                props.onChangePicture(file) 
                setErrors(prevErrors => ({
                    ...prevErrors,
                    picture: ""
                })) 
            }
        }
    } 

    // Fonction de validation du formulaire
    const validateForm = () => {
        let errorsForm = { ...errors } 

        if (!props.title || props.title.length > 100) {
            errorsForm.title = "Titre invalide" 
        }
        if (!props.description || props.description.length > 500) {
            errorsForm.description = "Description invalide" 
        }
        if (!props.link || props.link.length > 200) {
            errorsForm.link = "Lien invalide" 
        }
        setErrors(errorsForm) 

        return !Object.values(errorsForm).some(error => error !== "") 
    } 

    return (
        <section className="container-form">
            <form
                className="form-admin"
                onSubmit={(e) => {
                    e.preventDefault() 
                    if (validateForm()) {
                        props.handleSubmit() 
                    }
                }}
            >
                <label htmlFor="title">Titre</label>
                <input
                    type="text"
                    name="title"
                    value={props.title}
                    onChange={handleInputChange(props.onChangeTitle)}
                    maxLength={100}
                    required
                />
                {errors.title && <p className="error-message">{errors.title}</p>}

                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    value={props.description}
                    onChange={handleInputChange(props.onChangeDescription)}
                    maxLength={500}
                    required
                />
                {errors.description && <p className="error-message">{errors.description}</p>}

                <label htmlFor="image">Image <span className="required-asterisk">*</span></label>
                <input
                    type="file"
                    name="picture"
                    onChange={handleImageChange}
                    encType="multipart/form-data"
                />
                {errors.image && <p className="error-message">{errors.image}</p>}

                <label htmlFor="link">Lien</label>
                <input
                    type="text"
                    name="link"
                    value={props.link}
                    onChange={handleInputChange(props.onChangeLink)}
                    maxLength={200}
                    required
                />
                {errors.link && <p className="error-message">{errors.link}</p>}

                <label htmlFor="categories">Catégories</label>
                <select
                    name="categories"
                    value={props.selectedCategories}
                    onChange={handleInputChange(props.onChangeCategories)}
                    required
                    className="select-admin-form"
                >
                    <option value="">Sélectionnez une catégorie</option>
                    {props.categoriesList.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <button className="edit-information-button">Modifier l&apos information</button>
            </form>
        </section>
    ) 
} 

export default EditHealthInformationsForm 
