import { useState } from "react" 
import "@/styles/admin-forms.css" 

const AddProForm = (props) => {
    // États pour les messages d'erreur de validation
    const [errors, setErrors] = useState({
        lastname: "",
        firstname: "",
        address: "",
        zip: "",
        city: "",
        phone: "",
        details: ""
    }) 

    // Gestionnaire des changements de valeur des champs pour mettre à jour l'état et réinitialiser les messages d'erreur
    const handleInputChange = (setter) => (e) => {
        const { value, name } = e.currentTarget 
        // Mettre à jour la valeur du champ spécifique en utilisant la fonction setter passée
        const finalValue = name === 'specializations' ? parseInt(value, 10) : value 
        setter(finalValue) 
        // Réinitialiser le message d'erreur pour le champ spécifique lorsque l'utilisateur commence à taper
        setErrors(prev => ({ ...prev, [name]: "" })) 
    } 

    // Valider les champs du formulaire avant la soumission
    const validateForm = () => {
        let errorsForm = {} 
        // Valider chaque champ et ajouter un message d'erreur si nécessaire
        if (!props.lastname || props.lastname.length > 100) errorsForm.lastname = "Nom invalide" 
        if (!props.firstname || props.firstname.length > 50) errorsForm.firstname = "Prénom invalide" 
        if (!props.address || props.address.length > 50) errorsForm.address = "Adresse invalide" 
        if (!props.zip || props.zip.length > 5) errorsForm.zip = "Code postal invalide" 
        if (!props.city || props.city.length > 50) errorsForm.city = "Ville invalide" 
        if (!props.phone || props.phone.length > 10) errorsForm.phone = "Téléphone invalide" 
        
        // Mettre à jour l'état des erreurs avec les problèmes identifiés
        setErrors(errorsForm) 
        // Retourner true si aucune erreur, sinon retourner false
        return Object.keys(errorsForm).length === 0 
    } 

    return (
        <section className="container-form">
            <form onSubmit={(e) => {
                e.preventDefault() 
                if (validateForm()) {
                    props.handleSubmit() 
                }
            }} className="form-admin">

                <label htmlFor="lastname">Nom<span className="required-asterisk">*</span></label>
                <input 
                    type="text"
                    name="lastname"
                    value={props.lastname}
                    onChange={handleInputChange(props.onChangeLastname)}
                    maxLength={100}
                    required
                />
                {errors.lastname && <p className="error-message">{errors.lastname}</p>}

                <label htmlFor="firstname">Prénom<span className="required-asterisk">*</span></label>
                <input 
                    type="text"
                    name="firstname"
                    value={props.firstname}
                    onChange={handleInputChange(props.onChangeFirstname)}
                    maxLength={50}
                    required
                />
                {errors.firstname && <p className="error-message">{errors.firstname}</p>}

                <label htmlFor="address">Adresse<span className="required-asterisk">*</span></label>
                <input 
                    type="text"
                    name="address"
                    value={props.address}
                    onChange={handleInputChange(props.onChangeAddress)}
                    maxLength={50}
                    required
                />
                {errors.address && <p className="error-message">{errors.address}</p>}

                <label htmlFor="zip">Code postal<span className="required-asterisk">*</span></label>
                <input 
                    type="text"
                    name="zip"
                    value={props.zip}
                    onChange={handleInputChange(props.onChangeZip)}
                    maxLength={5}
                    required
                />
                {errors.zip && <p className="error-message">{errors.zip}</p>}

                <label htmlFor="city">Ville<span className="required-asterisk">*</span></label>
                <input 
                    type="text"
                    name="city"
                    value={props.city}
                    onChange={handleInputChange(props.onChangeCity)}
                    maxLength={50}
                    required
                />
                {errors.city && <p className="error-message">{errors.city}</p>}

                <label htmlFor="phone">Téléphone<span className="required-asterisk">*</span></label>
                <input 
                    type="text"
                    name="phone"
                    value={props.phone}
                    onChange={handleInputChange(props.onChangePhone)}
                    maxLength={10}
                    required
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}

                <label htmlFor="details">Détails<span className="required-asterisk">*</span></label>
                <input 
                    type="text"
                    name="details"
                    value={props.details}
                    onChange={handleInputChange(props.onChangeDetails)}
                    maxLength={100}
                />
                {errors.details && <p className="error-message">{errors.details}</p>}

                <label htmlFor="specializations">Spécialisation<span className="required-asterisk">*</span></label>
                {/* Menu déroulant de sélection de la spécialisation */}
                <select 
                    name="specializations"
                    value={props.specializations}
                    onChange={handleInputChange(props.onChangeSpecializations)}
                    required
                    className="select-admin-form"
                >
                    <option value="">Sélectionnez une spécialisation</option>
                    {props.specializationsList.map(spe => (
                        <option key={spe.id} value={spe.id}>{spe.name_spe}</option>
                    ))}
                </select>

                <button className="add-pro-button">Valider la création du professionnel</button>
            </form>
        </section>
    ) 
} 

export default AddProForm 
