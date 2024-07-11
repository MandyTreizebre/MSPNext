import { useState } from "react";
import "@/styles/admin-forms.css";

const AddSchedulesForPharmaciesOnCallForm = (props) => {
    const [errors, setErrors] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const handleInputChange = (setter) => (e) => {
        setter(e.currentTarget.value);
    };

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
                <label htmlFor="pharmacy">Pharmacie</label>
                <div>
                    <select
                        name="pharmacy"
                        value={props.selectedPharmacy}
                        onChange={(e) => props.onChangePharmacy(e.target.value)}
                    >
                        <option value="">Sélectionnez une pharmacie</option>
                        {props.pharmacies.map(pharmacy => (
                            <option key={pharmacy.id} value={pharmacy.id}>{pharmacy.name}</option>
                        ))}
                    </select>
                </div>
                {errors.pharmacy && <p className="error-message">{errors.pharmacy}</p>}

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

export default AddSchedulesForPharmaciesOnCallForm;
