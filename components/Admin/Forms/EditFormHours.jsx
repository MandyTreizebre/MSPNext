import "@/styles/admin-forms.css" 

const EditFormHours = (props) => {

    /* Fonction pour gérer les événements de changement de valeur des champs */
    const handleInputChange = (setter) => (e) => {
        let value = e.currentTarget.value 

        /* Si le nom de la cible actuelle est 'dayId', analyser la valeur en entier */
        if(e.currentTarget.name === "dayId"){
            value = parseInt(value, 10) 
        }
        /* Appeler la fonction setter passée dans les props avec la nouvelle valeur */
        setter(value) 
    } 

    /* Fonction pour gérer l'entrée des heures et formater la valeur */
    function handleHoursInput(callback){
        return (e) => {
            const value = e.target.value 

            /* Ajouter un deux-points après le 2e caractère si il n'y a pas déjà un deux-points */
            if(value.length === 2 && !value.includes(":")) {
                e.target.value = value + ":" 
            /* Ajouter un deux-points après le 5e caractère si le 5e caractère n'est pas un deux-points */
            } else if (value.length === 5 && value.charAt(4) !== ":") {
                e.target.value = value + ":" 
            }

            /* Si un callback est fourni, l'appeler avec l'événement */
            if(callback){
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
    
                {/* Menu déroulant pour la sélection du jour */}
                <label htmlFor="dayId">Sélectionner un jour</label>
                <select
                    name="dayId"
                    value={props.numSelectedDayId}
                    onChange={handleInputChange(props.onChangeDayId)}
                    className="select-admin-form"
                >
                    <option value="">Sélectionner un jour</option>
                    {props.dayList.map(day => (
                        <option key={day.id} value={day.id}>{day.day_name}</option>
                    ))}
                </select>
        
                <label htmlFor="hStartMorning">Heure de début (matin)</label>

                <input
                    type="text"
                    name="hStartMorning"
                    value={props.h_start_morning}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHStartMorning))}
                    disabled={!props.isHoursAvailable}
                />

                <label htmlFor="hEndMorning">Heure de fin (matin)</label>

                <input
                    type="text"
                    name="hEndMorning"
                    value={props.h_end_morning}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHEndMorning))}
                    disabled={!props.isHoursAvailable}
                />

                <label htmlFor="hStartAfternoon">Heure de début (après-midi)</label>

                <input
                    type="text"
                    name="hStartAfternoon"
                    value={props.h_start_afternoon}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHStartAfternoon))}
                    disabled={!props.isHoursAvailable}
                />

                <label htmlFor="hEndAfternoon">Heure de fin (après-midi)</label>

                <input
                    type="text"
                    name="hEndAfternoon"
                    value={props.h_end_afternoon}
                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    title="Entrez l'heure sous le format HH:MM:SS"
                    onChange={handleHoursInput(handleInputChange(props.onChangeHEndAfternoon))}
                    disabled={!props.isHoursAvailable}
                />

                <button className="edit-hours-button">Valider la modification des horaires</button>
            </form>
        </section>  
    ) 
} 

export default EditFormHours 
