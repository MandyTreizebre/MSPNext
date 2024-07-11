'use client'
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import Cookies from 'js-cookie'
import axios from 'axios'
import EditFormHours from "@/components/Admin/Forms/EditFormHours"
import Modal from "@/components/Modal"

const token = Cookies.get('token')

const EditHoursPro = () => {
    const params = useParams()
    const { pro_id } = params

    const [days, setDays] = useState([])
    const [selectedDayId, setSelectedDayId] = useState("")
    const [h_start_morning, setHStartMorning] = useState("")
    const [h_end_morning, setHEndMorning] = useState("")
    const [h_start_afternoon, setHStartAfternoon] = useState("")
    const [h_end_afternoon, setHEndAfternoon] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState("")
    const [isHoursAvailable, setIsHoursAvailable] = useState(true)
    const [openEditModalHours, setOpenEditModalHours] = useState(false)

    const handleCloseModal = () => {
        setOpenEditModalHours(false)
    }

    useEffect(() => {
        if (selectedDayId && pro_id) {
            axios.get(`/api/schedules/${pro_id}/${selectedDayId}`)
                .then((res) => {
                    const selectedHours = res.data[0]
                    if (selectedHours) {
                        setHStartMorning(selectedHours.h_start_morning)
                        setHEndMorning(selectedHours.h_end_morning)
                        setHStartAfternoon(selectedHours.h_start_afternoon)
                        setHEndAfternoon(selectedHours.h_end_afternoon)

                        setMessage("")
                        setIsHoursAvailable(true)
                    } else {
                        setHStartMorning("")
                        setHEndMorning("")
                        setHStartAfternoon("")
                        setHEndAfternoon("")

                        setMessage("Pas d'horaires définies pour ce jour")
                        setIsHoursAvailable(false)
                    }
                })
                .catch(err => {
                    setError("Une erreur est survenue lors de la récupération des horaires", err)
                });
        }
    }, [selectedDayId, pro_id])

    useEffect(() => {
        axios.get(`/api/days`)
            .then((res) => {
                setDays(res.data)
            })
            .catch(err => {
                setError("Une erreur est survenue lors de la récupération des jours", err)
            })
    }, [])

    const editHours = (datas, token) => {
        const pro_id_num = parseInt(pro_id, 10)
        datas.day_id = selectedDayId
        axios.put(`/api/schedules/edit/${pro_id_num}`, datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
            .then((res) => {
                if (res.status === 200) {
                    setHStartMorning("")
                    setHEndMorning("")
                    setHStartAfternoon("")
                    setHEndAfternoon("")

                    setOpenEditModalHours(true)
                    setTimeout(() => {
                        handleCloseModal()
                    }, 5000)
                } else {
                    setError("Erreur lors de la modification des horaires")
                }
            })
            .catch(err => {
                if (err.response?.data?.msg) {
                    setError(err.response.data.msg)
                } else {
                    setError("Une erreur est survenue")
                }
            })
    }

    const handleSubmitHours = () => {
        let datas = {
            pro_id: pro_id,
            h_start_morning: h_start_morning,
            h_end_morning: h_end_morning,
            h_start_afternoon: h_start_afternoon,
            h_end_afternoon: h_end_afternoon
        }
        editHours(datas, token)
    }

    return (
        <section className="form-container">
            <h1>Modifier les horaires du professionnel</h1>
            <EditFormHours
                dayList={days}
                h_start_morning={h_start_morning}
                h_end_morning={h_end_morning}
                h_start_afternoon={h_start_afternoon}
                h_end_afternoon={h_end_afternoon}

                onChangeDayId={setSelectedDayId}
                onChangeHStartMorning={setHStartMorning}
                onChangeHEndMorning={setHEndMorning}
                onChangeHStartAfternoon={setHStartAfternoon}
                onChangeHEndAfternoon={setHEndAfternoon}
                handleSubmitHours={handleSubmitHours}
                isHoursAvailable={isHoursAvailable}
            />
            {message && <div className="message-info">{message}</div>}
            <Modal open={openEditModalHours} onClose={handleCloseModal} message="Horaires modifiés" />
            {error && <div className="error-message">{error}</div>}
            <p>Si le professionnel n&apos;a pas d&apos;horaires, indiquer 00:00:00</p>
        </section>
    )
}

export default EditHoursPro
