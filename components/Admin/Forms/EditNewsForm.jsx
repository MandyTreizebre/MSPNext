import { useState } from "react" 
import "@/styles/admin-forms.css" 
import UploadFiles from "@/components/Uploader"

const EditNewsForm = (props) => {
    const [errors, setErrors] = useState({
        title: "",
        details: "",
        externalLink: "",
        picture: ""
    })  

    const handleInputChange = (setter) => (e) => {
        setter(e.currentTarget.value)  
    }  

    const validateForm = () => {
        let errorsForm = { ...errors }  

        if (!props.title || props.title.length > 50) {
            errorsForm.title = "Titre invalide"  
        }

        if (!props.details || props.details.length > 500) {
            errorsForm.details = "Détails invalides"  
        }

        if (!props.externalLink || props.externalLink.length > 150) {
            errorsForm.externalLink = "Lien invalide"  
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
                    maxLength={50}
                />
                {errors.title && <p className="error-message">{errors.title}</p>}

                <label htmlFor="details">Détails</label>
                <textarea
                    type="text"
                    name="details"
                    value={props.details}
                    onChange={handleInputChange(props.onChangeDetails)}
                    maxLength={500}
                />
                {errors.details && <p className="error-message">{errors.details}</p>}

                <label htmlFor="picture">Image</label>
                <UploadFiles onUpload={props.onChangePicture} />
                {errors.picture && <p className="error-message">{errors.picture}</p>}

                <label htmlFor="external_link">Lien externe</label>      
                <input
                    type="text"
                    name="external_link"
                    value={props.externalLink}
                    onChange={handleInputChange(props.onChangeExternalLink)}
                    maxLength={150}
                />
                {errors.externalLink && <p className="error-message">{errors.externalLink}</p>}

                <button className="add-new-button">Valider la modification du professionnel</button>
            </form>
        </section>
    )  
}  

export default EditNewsForm 
