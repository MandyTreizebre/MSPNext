import { useState, useEffect } from "react" 
import { displayPharmaciesAndSchedules } from "@/api/Pharmacie" 
import PharmaciesOnCallForGuards from "./PharmaciesOnCallForGuards" 

const PharmaciesOnCall = () => {
    const [pharmaciesOnCall, setPharmaciesOnCall] = useState([]) 

    const getCurrentHour = () => {
        const currentDate = new Date() 
        const hour = currentDate.getHours() 
        const minutes = currentDate.getMinutes().toString().padStart(2, '0') 
        return `${hour}:${minutes}` 
    } 

    const getCurrentDate = () => {
        const currentDate = new Date() 
        const year = currentDate.getFullYear() 
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') 
        const day = currentDate.getDate().toString().padStart(2, '0') 
        return `${year}-${month}-${day}` 
    } 

    const currentHour = getCurrentHour() 
    const currentDate = getCurrentDate() 

    useEffect(() => {
        displayPharmaciesAndSchedules()
            .then((res) => {
                const onCallPharmacies = [] 
                res.data.result.forEach((pharmacy) => {
                    const startTimeHHMM = pharmacy.start_time.substring(0, 5) 
                    const endTimeHHMM = pharmacy.end_time.substring(0, 5) 
                    const pharmacyDate = new Date(pharmacy.date)

                    const localPharmacyDate = new Date(pharmacyDate.getTime() - pharmacyDate.getTimezoneOffset() * 60000)
                        .toISOString().split('T')[0] 
                        
                    if (localPharmacyDate === currentDate) {
                        if (startTimeHHMM <= currentHour && currentHour <= endTimeHHMM) {
                            onCallPharmacies.push(pharmacy) 
                        }
                    }
                }) 
                setPharmaciesOnCall(onCallPharmacies) 
            })
            .catch((err) => console.error(err)) 
    }, [currentDate, currentHour]) 

    return (
        <section className="section-pharmacies-on-call">
            <h2>Pharmacies de Garde</h2>
            {pharmaciesOnCall.length > 0 ? (
                <PharmaciesOnCallForGuards pharmaciesOnCall={pharmaciesOnCall} />
            ) : (
                <p>Aucune pharmacie de garde disponible actuellement.</p>
            )}
        </section>
    ) 
} 

export default PharmaciesOnCall 
