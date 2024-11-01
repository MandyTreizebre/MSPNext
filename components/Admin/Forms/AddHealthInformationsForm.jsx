import { useState } from "react" 
import "@/styles/admin-forms.css"
import UploadFiles from "@/components/Uploader"

const AddHealthInformationsForm = (props) => {
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image: "",
        link: ""
    }) 

    const handleInputChange = (setter) => (e) => {
        const { value, name } = e.currentTarget 
        const finalValue = name === 'categories' ? parseInt(value, 10) : value 
        setter(finalValue) 
        setErrors(prev => ({ ...prev, [name]: "" })) 
    } 

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
                <label htmlFor="title">Titre <span className="required-asterisk">*</span></label>
                <input
                    type="text"
                    name="title"
                    value={props.title || ""}
                    onChange={handleInputChange(props.onChangeTitle)}
                    maxLength={100}
                    required
                />
                {errors.title && <p className="error-message">{errors.title}</p>}

                <label htmlFor="description">Description <span className="required-asterisk">*</span></label>
                <input
                    type="text"
                    name="description"
                    value={props.description || ""}
                    onChange={handleInputChange(props.onChangeDescription)}
                    maxLength={500}
                    required
                />
                {errors.description && <p className="error-message">{errors.description}</p>}

                <label htmlFor="picture">Image</label>
                <UploadFiles onUpload={props.onChangePicture} />
                {errors.picture && <p className="error-message">{errors.picture}</p>}

                <label htmlFor="link">Lien <span className="required-asterisk">*</span></label>
                <input
                    type="text"
                    name="link"
                    value={props.link || ""}
                    onChange={handleInputChange(props.onChangeLink)}
                    maxLength={200}
                    required
                />
                {errors.link && <p className="error-message">{errors.link}</p>}

                <label htmlFor="categories">Catégories <span className="required-asterisk">*</span></label>
                <select
                    name="categories"
                    value={props.selectedCategory}
                    onChange={handleInputChange(props.onChangeCategory)}
                    required
                    className="select-admin-form"
                >
                    <option value="">Sélectionnez une catégorie</option>
                    {props.categoriesList.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <button className="add-information-button">Valider la création de l&apos;information</button>
            </form>
        </section>
    ) 
} 

export default AddHealthInformationsForm 