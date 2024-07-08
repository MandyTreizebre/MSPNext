import "@/styles/admin-forms.css" 

const AddHoursForm = (props) => {

    // Fonction pour gérer les changements de valeur des champs de formulaire
    const handleInputChange = (setter) => (e) => {
        setter(e.currentTarget.value) 
    } 

    // Fonction pour gérer les changements de valeur des champs numériques
    const handleNumberInputChange = (setter) => (e) => {
        const value = e.currentTarget.value 
        const numberValue = parseInt(value, 10) 
        // Définir la valeur numérique analysée ou la valeur d'origine si ce n'est pas un nombre
        setter(isNaN(numberValue) ? value : numberValue) 
    } 

    // Fonction pour gérer l'entrée des heures et formater la valeur
    function handleHoursInput(callback) {
        return (e) => {
            const value = e.target.value 

            // Ajouter deux-points après le 2e et le 5e caractère pour le format de l'heure
            if (value.length === 2 || value.length === 5) {
                e.target.value = value + ":" 
            }

            if (callback) {
                callback(e) 
            }
        } 
    }

    return (
        <section className="container-form">
            <form onSubmit={(e) => {
                e.preventDefault() 
                props.handleSubmitHours() 
            }} className="form-admin">

                {/* Menu déroulant pour la sélection du professionnel */}
                <label htmlFor="pro">Sélectionner un professionnel <span className="required-asterisk">*</span></label>
                <select
                    name="pro"
                    value={props.pro_id}
                    onChange={handleNumberInputChange(props.onChangePro)}
                    required
                    className="select-admin-form"
                >
                    <option value="">Sélectionner un professionnel</option>
                    {props.proList.map((pro) => (
                        <option key={pro.id} value={pro.id}>{pro.lastname} {pro.firstname}</option>
                    ))}
                </select>

                {/* Menu déroulant pour la sélection du jour */}
                <label htmlFor="day">Jour <span className="required-asterisk">*</span></label>
                <select
                    name="day"
                    value={props.day_id}
                    onChange={handleNumberInputChange(props.onChangeDay)}
                    required
                    className="select-admin-form"
                >
                    <option value="">Sélectionner un jour</option>
                    {props.dayList.map(day => (
                        <option key={day.id} value={day.id}>{day.day_name}</option>
                    ))}
                </select>

                <label htmlFor="hStartMorning">Heure de début (matin) <span className="required-asterisk">*</span></label>

                <input
                    type="text"
                    name="hStartMorning"
                    value={props.h_start_morning}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHStartMorning))}
                    required
                />

                <label htmlFor="hEndMorning">Heure de fin (matin) <span className="required-asterisk">*</span></label>

                <input
                    type="text"
                    name="hEndMorning"
                    value={props.h_end_morning}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHEndMorning))}
                    required
                />

                <label htmlFor="hStartAfternoon">Heure de début (après-midi) <span className="required-asterisk">*</span></label>

                <input
                    type="text"
                    name="hStartAfternoon"
                    value={props.h_start_afternoon}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHStartAfternoon))}
                    required
                />

                <label htmlFor="hEndAfternoon">Heure de fin (après-midi) <span className="required-asterisk">*</span></label>

                <input
                    type="text"
                    name="hEndAfternoon"
                    value={props.h_end_afternoon}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHEndAfternoon))}
                    required
                />

                <button className="add-hours-button">Valider l&apos; ajout des horaires</button>
            </form>
        </section>
    ) 
} 

export default AddHoursForm 