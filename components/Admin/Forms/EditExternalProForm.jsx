import { useState } from "react" 
import "@/styles/admin-forms.css"
import UploadFiles from "@/components/Uploader"

const EditExternalProForm = (props) => {
    const [errors, setErrors] = useState({
        name: "",
        link: "",
        picture: ""
    }) 

    const handleInputChange = (setter) => (e) => {
        setter(e.currentTarget.value) 
    } 

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
            <form 
                className="form-admin"
                onSubmit={(e) => {
                    e.preventDefault() 
                    if (validateForm()) {
                        props.handleSubmit() 
                    }
                }}
            >
                <label htmlFor="name">Nom</label>
                <input
                    type="text"
                    name="name"
                    value={props.name}
                    onChange={handleInputChange(props.onChangeName)}
                    maxLength={50}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}

                <label htmlFor="picture">Image</label>
                <UploadFiles onUpload={props.onChangePicture} />
                {errors.picture && <p className="error-message">{errors.picture}</p>}
                
                <label htmlFor="link">Lien externe</label>
                <input
                    type="text"
                    name="link"
                    value={props.link}
                    onChange={handleInputChange(props.onChangeLink)}
                    maxLength={60}
                />
                {errors.link && <p className="error-message">{errors.link}</p>}

                <button className="add-external-pro-button">Valider la modification du professionnel</button>
            </form>
        </section>
    ) 
} 

export default EditExternalProForm 