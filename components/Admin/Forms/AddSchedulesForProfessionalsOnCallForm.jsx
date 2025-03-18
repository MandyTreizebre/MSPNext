import { useState } from "react";
import "@/styles/admin-forms.css";

const AddSchedulesForProfessionalsOnCallForm = (props) => {
    const [errors, setErrors] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const handleInputChange = (setter) => (e) => {
        setter(e.currentTarget.value);
    };

       // Fonction pour gérer les changements de valeur des champs numériques
       const handleNumberInputChange = (setter) => (e) => {
        const value = e.currentTarget.value 
        const numberValue = parseInt(value, 10) 
        // Définir la valeur numérique analysée ou la valeur d'origine si ce n'est pas un nombre
        setter(isNaN(numberValue) ? value : numberValue) 
    } 

    const validateForm = () => {
        let errorsForm = { ...errors };

        if (!props.date) {
            errorsForm.date = "Date invalide";
        }

        if (!props.startTime) {
            errorsForm.startTime = "Heure de début invalide";
        }

        if (!props.endTime) {
            errorsForm.endTime = "Heure de fin invalide";
        }

        setErrors(errorsForm);

        return !Object.values(errorsForm).some((error) => error !== "");
    };

    return (
        <section className="container-form">
            <form
                className="form-admin"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (validateForm()) {
                        props.handleSubmit();
                    }
                }}
            >

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    value={props.date}
                    onChange={handleInputChange(props.onChangeDate)}
                    required
                />
                {errors.date && <p className="error-message">{errors.date}</p>}

                <label htmlFor="startTime">Heure de début</label>
                <input
                    type="time"
                    name="startTime"
                    value={props.startTime}
                    onChange={handleInputChange(props.onChangeStartTime)}
                    required
                />
                {errors.startTime && <p className="error-message">{errors.startTime}</p>}

                <label htmlFor="endTime">Heure de fin</label>
                <input
                    type="time"
                    name="endTime"
                    value={props.endTime}
                    onChange={handleInputChange(props.onChangeEndTime)}
                    required
                />
                {errors.endTime && <p className="error-message">{errors.endTime}</p>}

                <button className="add-schedule-button">Ajouter la garde</button>
            </form>
        </section>
    );
};

export default AddSchedulesForProfessionalsOnCallForm
