'use client'
import { useEffect, useState } from "react"
import axios from 'axios'
import AddSchedulesForProfessionalsOnCallForm from '../../../components/Admin/Forms/AddSchedulesForProfessionalsOnCallForm'
import Modal from "@/components/Modal"

export default function PageProfessionalsOnCall() {
    const [ProfessionalsOnCall, setProfessionalsOnCall] = useState([])
    const [SchedulesOnCall, setSchedulesOnCall] = useState([])
    const [selectedProfessional, setSelectedProfessional] = useState(null)
    const [showAddScheduleForm, setShowAddScheduleForm] = useState(false)
    const [newSchedule, setNewSchedule] = useState({ date: "", startTime: "", endTime: "" })
    const [openAddSchedulesModal, setOpenAddSchedulesModal] = useState(false) 
    const [error, setError] = useState(null)

    const handleCloseModal = () => {
        setOpenAddSchedulesModal(false) 
    } 

    // Récupération des professionnels de gardes
    const displayProfessionalsOnCall = () => {
        setError(null)
        axios.get('/api/professionals-on-call')
            .then((res) => {
                setProfessionalsOnCall(res.data)
            })
            .catch((err) => {
                setError("Erreur lors de la récupération des professionnels de garde")
                console.error("Erreur :", err)
            })
    }

    // Récupération des horaires de gardes
    const displaySchedulesOnCall = () => {
        setError(null)
        axios.get('/api/professionals-on-call/schedules')
            .then((res) => {
                setSchedulesOnCall(res.data)
            })
            .catch((err) => {
                setError("Erreur lors de la récupération des horaires de garde")
                console.error("Erreur :", err)
            })
    }

    useEffect(() => {
        displayProfessionalsOnCall()
        displaySchedulesOnCall()
    }, [])

    // Fonction pour gérer la sélection d'un professionnel
    const handleSelectProfessional = (event) => {
        const professionalId = parseInt(event.target.value)
        // Trouver le professionnel sélectionné dans la liste des professionnels
        const professional = ProfessionalsOnCall.find(pro => pro.id === professionalId)
        // Filtrer les horaires de garde pour le professionnel sélectionné
        const onCallSchedules = SchedulesOnCall.filter(schedule => schedule.professional_id === professionalId)
        
        // Création d'un objet combinant le professionnel et ses horaires de garde
        const professionalWithSchedules = { 
            ...professional, 
            on_call_schedule: onCallSchedules 
        }
        
        // Mise à jour l'état avec le professionnel sélectionné
        setSelectedProfessional(professionalWithSchedules || null)
        setShowAddScheduleForm(false)
    }

    // Gestion de l'affichage du formulaire d'ajout des horaires
    const handleAddScheduleClick = () => {
        setShowAddScheduleForm(true)
    }

     // Ajouter un horaire de garde
    const handleScheduleSubmit = () => {
        axios.post(`/api/professionals-on-call/schedules/add`, {
            pro_id: selectedProfessional.id,
            date: newSchedule.date,
            start_time: newSchedule.startTime,
            end_time: newSchedule.endTime
        })
        .then((res) => {
            if (res.status === 201) {
                setShowAddScheduleForm(false)
                displaySchedulesOnCall()
                setOpenAddSchedulesModal(true) 
                setTimeout(() => {
                    handleCloseModal() 
                }, 5000) 
            }

        })
        .catch((error) => {
            setError("Une erreur est survenue") 
        })
    }

    return (
        <>
            <h1>Les professionnels de garde</h1>
            <h2>Afficher le planning de : </h2>

            {/* Sélecteur pour choisir un professionnel */}
            <select onChange={handleSelectProfessional}>
                <option value="">Sélectionnez un professionnel</option>
                {ProfessionalsOnCall.map((professional) => (
                    <option key={professional.id} value={professional.id}>{professional.lastname} {professional.firstname}</option>
                ))}
            </select>
            {error && <div className="error-message">{error}</div>}

            {selectedProfessional && (
                <div>
                    <h3>Horaires Standards de {selectedProfessional.lastname} {selectedProfessional.firstname}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Jour</th>
                                <th>Début Matin</th>
                                <th>Fin Matin</th>
                                <th>Début Après-midi</th>
                                <th>Fin Après-midi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProfessional.weekly_schedule.map((schedule, index) => (
                                <tr key={index}>
                                    <td>{schedule.day_name}</td>
                                    <td>{schedule.morning_start || "N/A"}</td>
                                    <td>{schedule.morning_end || "N/A"}</td>
                                    <td>{schedule.afternoon_start || "N/A"}</td>
                                    <td>{schedule.afternoon_end || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>Horaires de Garde de {selectedProfessional.lastname} {selectedProfessional.firstname}</h3>

                    {selectedProfessional.on_call_schedule.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Début Garde</th>
                                    <th>Fin Garde</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProfessional.on_call_schedule.map((onCall, index) => (
                                    <tr key={index}>
                                        <td>{onCall.date}</td>
                                        <td>{onCall.start_time || "N/A"}</td>
                                        <td>{onCall.end_time || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Pas d'horaires de garde pour ce professionnel</p>
                    )}

                    <button onClick={handleAddScheduleClick}>Ajouter un horaire de garde</button>
                </div>
            )}

            {/* Affichage conditionnel du formulaire d'ajout d'horaires de garde */}
            {showAddScheduleForm && (
                <AddSchedulesForProfessionalsOnCallForm 
                    pro_id={selectedProfessional.id}
                    proList={ProfessionalsOnCall}
                    date={newSchedule.date}
                    startTime={newSchedule.startTime}
                    endTime={newSchedule.endTime}
                    onChangeDate={(date) => setNewSchedule(prev => ({ ...prev, date }))}
                    onChangeStartTime={(startTime) => setNewSchedule(prev => ({ ...prev, startTime }))}
                    onChangeEndTime={(endTime) => setNewSchedule(prev => ({ ...prev, endTime }))}
                    handleSubmit={handleScheduleSubmit}
                />
            )}
            <Modal open={openAddSchedulesModal} onClose={handleCloseModal} message="Horaires ajoutés" />
        </>
    )
}
