import { useState } from "react" 
import "@/styles/admin-forms.css" 

const AddExternalProForm = (props) => {
    // Initialisation de l'état pour les erreurs de formulaire
    const [errors, setErrors] = useState({
        name: "",
        link: "",
        picture: ""
    }) 

    // Fonction de gestion du changement de valeur des champs de formulaire
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

        if (!props.name || props.name.length > 50) {
            errorsForm.name = "Nom invalide" 
        }

        if (!props.link || props.link.length > 60) {
            errorsForm.link = "Lien invalide" 
        }

        setErrors(errorsForm) 

        return !Object.values(errorsForm).some(error => error !== "") 
    } 

    return (
        <section className="container-form">
            <form onSubmit={(e) => {
                e.preventDefault() 
                if (validateForm()) {
                    props.handleSubmit() 
                }
            }} className="form-admin">

                <label htmlFor="name">Nom <span className="required-asterisk">*</span></label>
                <input
                    type="text"
                    name="name"
                    value={props.name}
                    onChange={handleInputChange(props.onChangeName)}
                    maxLength={50}
                    required
                />
                {errors.name && <p className="error-message">{errors.name}</p>}

                <label htmlFor="picture">Image <span className="required-asterisk">*</span></label>
                <input
                    type="file"
                    name="picture"
                    onChange={handleImageChange}
                    encType="multipart/form-data"
                    required
                />
                {errors.picture && <p className="error-message">{errors.picture}</p>}

                <label htmlFor="link">Lien externe <span className="required-asterisk">*</span></label>
                <input
                    type="text"
                    name="link"
                    value={props.link}
                    onChange={handleInputChange(props.onChangeLink)}
                    maxLength={60}
                    required
                />
                {errors.link && <p className="error-message">{errors.link}</p>}

                <button className="add-external-pro-button">Valider la création du professionnel</button>
            </form>
        </section>
    ) 
} 

export default AddExternalProForm 