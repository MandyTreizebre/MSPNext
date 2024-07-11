'use client'
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import axios from 'axios'
import AddHoursForm from "../../../../components/Admin/Forms/AddHoursForm"
import Modal from "../../../../components/Modal"

export default function AddHoursPro() {
    const [professional, setProfessional] = useState([])
    const [selectedPro, setSelectedPro] = useState("")
    const [day, setDay] = useState([])
    const [selectedDay, setSelectedDay] = useState(null)
    const [h_start_morning, setHStartMorning] = useState("")
    const [h_end_morning, setHEndMorning] = useState("")
    const [h_start_afternoon, setHStartAfternoon] = useState("")
    const [h_end_afternoon, setHEndAfternoon] = useState("")
    const [error, setError] = useState(null)
    const [openAddHoursModal, setOpenAddHoursModal] = useState(false)

    const handleCloseModal = () => {
        setOpenAddHoursModal(false)
    }

    useEffect(() => {
        axios.get('/api/days')
            .then((res) => {
                setDay(res.data)
            })
            .catch(err => {
                setError("Echec du chargement des jours", err)
            })

        axios.get('/api/professionals')
            .then((res) => {
                setProfessional(res.data)
            })
            .catch(err => {
                setError("Échec du chargement des professionnels.", err)
            })
    }, [])

    const saveHours = (datas, token) => {
        axios.post('/api/schedules/add', datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            }, 
            withCredentials: true
        })
            .then((res) => {
                if (res.status === 201) {
                    setHStartMorning("") 
                    setHEndMorning("") 
                    setHStartAfternoon("") 
                    setHEndAfternoon("") 
                    setSelectedDay(null)

                    setOpenAddHoursModal(true)
                    setTimeout(() => {
                        handleCloseModal()
                    }, 5000)
                } 
            })
            .catch(err => {
                setError(err.response.data.msg || "Une erreur est survenue")
            })
    }

    const handleSubmitHours = () => {
        setError(null)

        const datas = {
            pro_id: selectedPro,
            day_id: selectedDay,
            h_start_morning,
            h_end_morning,
            h_start_afternoon,
            h_end_afternoon
        }

        saveHours(datas, Cookies.get('token'))
    }

    return (
        <section className="form-container">
            <h1>Ajouter les horaires</h1>
            <p className="required-p">Les champs suivis d&apos;un <span className="required-asterisk">*</span> sont obligatoires.</p>

            <AddHoursForm
                proList={professional}
                dayList={day}
                h_start_morning={h_start_morning}
                h_end_morning={h_end_morning}
                h_start_afternoon={h_start_afternoon}
                h_end_afternoon={h_end_afternoon}
                onChangePro={setSelectedPro}
                onChangeDay={setSelectedDay}
                onChangeHStartMorning={setHStartMorning}
                onChangeHEndMorning={setHEndMorning}
                onChangeHStartAfternoon={setHStartAfternoon}
                onChangeHEndAfternoon={setHEndAfternoon}
                handleSubmitHours={handleSubmitHours}
            />
            {error && <div className="error-message">{error}</div>}
            <Modal open={openAddHoursModal} onClose={handleCloseModal} message="Horaires ajoutés" />
        </section>
    )
}
