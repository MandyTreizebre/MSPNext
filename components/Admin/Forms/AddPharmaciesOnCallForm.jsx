import { useState } from "react"

const AddPharmaciesOnCallAndSchedulesForm = (props) => {

    // Initialisation de l'état pour les erreurs de formulaire
    const [errors, setErrors] = useState({
      name: "",
      address: "",
      phone: "",
  })

  const handleInputChange = (setter) => (e) => {
    setter(e.currentTarget.value) 
}

const validateForm = () => {
    let errorsForm = { ...errors } 

    if (!props.name || props.name.length > 200) {
        errorsForm.name = "Nom invalide" 
    }

    if (!props.address || props.address.length > 200) {
        errorsForm.address = "Addresse invalides" 
    }

    if (!props.phone || props.phone.length > 10) {
        errorsForm.phone = "Téléphone invalide" 
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
            }}>
            
            <label htmlFor="name">Nom de la pharmacie</label>
            <input
                type="text"
                name="name"
                value={props.name}
                onChange={handleInputChange(props.onChangeName)}
                maxLength={200}
                required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <label htmlFor="address">Adresse</label>
            <input
                type="text"
                name="address"
                value={props.address}
                onChange={handleInputChange(props.onChangeAddress)}
                maxLength={200}
                required
            />
            {errors.address && <p className="error-message">{errors.address}</p>}

            <label htmlFor="phone">Téléphone</label>
            <input
                type="text"
                name="phone"
                value={props.phone}
                onChange={handleInputChange(props.onChangePhone)}
                maxLength={10}
                required
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
            
            <button className="add-pharmacie-button">Valider la création de la pharmacie</button>
        </form>
    </section>
  )
}

export default AddPharmaciesOnCallAndSchedulesForm