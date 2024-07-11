'use client'
import { useState, useEffect } from "react" 
import axios from 'axios'
import { useParams } from 'next/navigation'
import EditProForm from "@/components/Admin/Forms/EditProForm" 
import Modal from "@/components/Modal" 

const EditPro = () => {
    const { id } = useParams()
    const [lastname, setLastname] = useState("") 
    const [firstname, setFirstname] = useState("") 
    const [address, setAddress] = useState("") 
    const [zip, setZip] = useState("") 
    const [city, setCity] = useState("") 
    const [phone, setPhone] = useState("")
    const [details, setDetails] = useState("") 
    const [specializations, setSpecializations] = useState([]) 
    const [selectedSpecialization, setSelectedSpecialization] = useState("") 
    const [error, setError] = useState(null) 
    const [openEditModal, setOpenEditModal] = useState(false) 

    const handleCloseModal = () => {
        setOpenEditModal(false) 
    } 

    useEffect(() => {
        axios.get(`/api/professionals/by-id/${id}`)
            .then((res) => {
                const data = res.data[0] 
                setLastname(data.lastname) 
                setFirstname(data.firstname) 
                setAddress(data.address) 
                setZip(data.zip) 
                setCity(data.city) 
                setPhone(data.phone) 
                setDetails(data.details) 
                setSelectedSpecialization(data.speciality_id) 
            })
            .catch((err) => {
                setError("Erreur lors de la récupération du professionnel") 
            }) 
    }, [id]) 

    useEffect(() => {
        axios.get(`/api/specializations`)
            .then((res) => {
                setSpecializations(res.data) 
            })
            .catch((err) => {
                setError("Erreur lors de la récupération des spécialisations") 
            }) 
    }, []) 

    const editPro = (datas, token) => {
        axios.put(`/api/professionals/edit/${id}`, datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
        .then((res) => {
            if (res.status === 200) {
                setSelectedSpecialization([])
                setError(null)
                setOpenEditModal(true) 
                setTimeout(() => {
                    handleCloseModal() 
                }, 5000) 
            }
        })
        .catch((err) => {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg)
            } else {
                setError("Une erreur est survenue")
            }
        }) 
    } 

    const handleSubmit = () => {
        let datas = {
            lastname: String(lastname).trim(),
            firstname: String(firstname).trim(),
            address: String(address).trim(),
            zip: String(zip).trim(),
            city: String(city).trim(),
            phone: String(phone).trim(),
            details: String(details).trim(),
            speciality_id: Number(selectedSpecialization),
        }
        editPro(datas) 
    } 

    return (
        <section className="form-container">
            <h1>Modifier le professionnel</h1>
            <EditProForm
                lastname={lastname}
                firstname={firstname}
                address={address}
                zip={zip}
                city={city}
                phone={phone}
                details={details}
                specializationsList={specializations}
                selectedSpecialization={selectedSpecialization}
                onChangeLastname={setLastname}
                onChangeFirstname={setFirstname}
                onChangeAddress={setAddress}
                onChangeZip={setZip}
                onChangeCity={setCity}
                onChangePhone={setPhone}
                onChangeDetails={setDetails}
                onChangeSpecializations={setSelectedSpecialization}
                handleSubmit={handleSubmit}
            />
            {error && <div className="error-message">{error}</div>}
            <Modal open={openEditModal} onClose={handleCloseModal} message="Professionnel modifié" />
        </section>
    ) 
} 

export default EditPro
