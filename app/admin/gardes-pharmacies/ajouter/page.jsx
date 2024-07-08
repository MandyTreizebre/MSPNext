'use client'
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
const token = Cookies.get('token')
import { addPharmaciesOnCallAPI, displayAllPharmaciesOnCallAPI, addSchedulesPharmaciesOnCallAPI } from "@/api/Pharmacie"
import AddPharmaciesOnCallForm from "@/components/Admin/Forms/AddPharmaciesOnCallForm"
import AddSchedulesForPharmaciesOnCallForm from "@/components/Admin/Forms/AddSchedulesForPharmaciesOnCallForm"
import Modal from "@/components/Modal"

export default function AddPharmaciesOnCallAndSchedules() {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const [error, setError] = useState("")
    const [openAddPharmaciesModal, setOpenAddPharmaciesModal] = useState(false)

    const [pharmaciesOnCall, setPharmaciesOnCall] = useState([]) 
    const [selectedPharmacy, setSelectedPharmacy] = useState(null) 
    const [date, setDate] = useState("") 
    const [startTime, setStartTime] = useState("") 
    const [endTime, setEndTime] = useState("") 
    const [openAddSchedulesPharmaciesModal, setOpenAddSchedulesPharmaciesModal] = useState(false) 

    const handleCloseModal = () => {
        setOpenAddPharmaciesModal(false)
    }

    const handleCloseSchedulesModal = () => {
        setOpenAddSchedulesPharmaciesModal(false)
    }

    const displayAllPharmaciesOnCall = () => {
        setError(null) 
        displayAllPharmaciesOnCallAPI()
            .then((res) => {
                setPharmaciesOnCall(res.data.result) 
            })
            .catch((err) => {
                setError("Erreur lors de la récupération des pharmacies de gardes", err) 
            }) 
    } 

    useEffect(() => {
        displayAllPharmaciesOnCall() 
    }, []) 

    const savePharmacies = (datas, token) => {
        addPharmaciesOnCallAPI(datas, token)
        .then((res)=> {
            if (res.status === 201) {
                setName("")
                setAddress("")
                setPhone("")
                setError("")
                setOpenAddPharmaciesModal(true)
                displayAllPharmaciesOnCall()
                setTimeout(()=>{
                    handleCloseModal()
                }, 5000)
            }
        })
        .catch(err => {
            if (err.message === "Nom invalide") {
                setError(err.message)
            }

            if (err.message === "Adresse invalide") {
                setError(err.message)
            }

            if (err.message === "Téléphone invalide") {
                setError(err.message)
            }
        })
    }

    const handleSubmit = () => {
        const formData = {
            name: name,
            address: address, 
            phone: phone
        }

        console.log("data to send =>", formData)

        savePharmacies(formData, token)
    }

    const saveSchedulesPharmaciesOnCall = (datas, token) => {
        addSchedulesPharmaciesOnCallAPI(datas, token)
            .then((res) => {
                if (res.status === 201) {
                    setSelectedPharmacy(null) 
                    setDate("") 
                    setStartTime("") 
                    setEndTime("") 
                    setError("") 
                    setOpenAddSchedulesPharmaciesModal(true) 
                    setTimeout(() => {
                        handleCloseSchedulesModal() 
                    }, 5000) 
                }
            })
            .catch((err) => {
                setError("Erreur lors de l'ajout de la garde.", err) 
            }) 
    } 

    const handleSubmitSchedulesPharmaciesOnCall = () => {
        const formData = {
            pharmacy_id: selectedPharmacy,
            date: date,
            start_time: startTime,
            end_time: endTime
        } 

        console.log("data to send =>", formData) 

        saveSchedulesPharmaciesOnCall(formData, token) 
    } 


    return (
        <>
            <section className="form-container">
                <h1>Ajouter des pharmacies de gardes</h1>
                <p className="required-p">Les champs suivis d&apos un <span className="required-asterisk">*</span> sont obligatoires.</p>
            
                <AddPharmaciesOnCallForm
                        name={name}
                        address={address}
                        phone={phone}

                        onChangeName={setName}
                        onChangeAddress={setAddress}
                        onChangePhone={setPhone}
                        handleSubmit={handleSubmit}
                    />
                    {error && <div className="error-message">{error}</div>}
                    <Modal open={openAddPharmaciesModal} onClose={handleCloseModal} message="Pharmacie ajoutée" />
            </section>


            <h2>Ajouter les dates et horaires de gardes des pharmacies</h2>

            <AddSchedulesForPharmaciesOnCallForm
                    pharmacies={pharmaciesOnCall}
                    selectedPharmacy={selectedPharmacy}
                    date={date}
                    startTime={startTime}
                    endTime={endTime}

                    onChangePharmacy={setSelectedPharmacy}
                    onChangeDate={setDate}
                    onChangeStartTime={setStartTime}
                    onChangeEndTime={setEndTime}
                    handleSubmit={handleSubmitSchedulesPharmaciesOnCall}
                />
                {error && <div className="error-message">{error}</div>}
                <Modal open={openAddSchedulesPharmaciesModal} onClose={handleCloseModal} message="Garde ajoutée" />
        </>
    )
}
