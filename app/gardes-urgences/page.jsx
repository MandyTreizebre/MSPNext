'use client'
import { useState, useEffect } from "react"
import axios from 'axios'
import "./gardes-urgences.css"
import Clock from "@/components/Clock"
import PharmaciesForGuards from "@/components/componentsGuards/PharmaciesForGuards"
import DentistsForGuards from "@/components/componentsGuards/DentistsForGuards"
import DoctorsForGuards from "@/components/componentsGuards/DoctorsForGuards"
import PharmaciesOnCall from "@/components/componentsGuards/PharmaciesOnCall"

export default function ProfessionalsOnCall() {

    const [guards, setGuards] = useState([])
    const [doctors, setDoctors] = useState([])
    const [dentists, setDentists] = useState([])
    const [pharmacies, setPharmacies] = useState([])

    /*Function to get the current hour and minute.*/
    const getCurrentHour = () => {
        const currentDate = new Date()
        const hour = currentDate.getHours()
        const minutes = currentDate.getMinutes().toString().padStart(2, '0')
        return `${hour}:${minutes}`
    }

    /*Function to get the current day name*/
    const getCurrentDay = () => {
        const currentDate = new Date()
        const options = { weekday: 'long' }
        const dayName =  new Intl.DateTimeFormat('fr-FR', options).format(currentDate) 

        return dayName.charAt(0).toUpperCase() + dayName.slice(1)
    }

    /*Function to get the current date in day month year format*/
    const getCurrentDate = () => {
        const currentDate = new Date()
        const day = currentDate.getDate() 
        const year = currentDate.getFullYear()

        const options = {month: 'long'}
        const monthName =  new Intl.DateTimeFormat('fr-FR', options).format(currentDate)

        return `${day} ${monthName} ${year}`
    }

    const currentHour = getCurrentHour()
    const currentDay = getCurrentDay()
    const actualDate = getCurrentDate()

    /*State for current hour which will update at regular intervals*/
    const [currentHours, setCurrentHours] = useState(getCurrentHour())

    useEffect(()=>{
        /*Timeout to get professional data after 1 second*/
        setTimeout(()=> {
            axios.get('/api/professionals-on-call')
        .then((res)=>{
            setGuards(res.data)
                const pharmacies = []
                const dentists = []
                const doctors = []
                /*Iterate over the professionals and categorize them based on their availability and type.*/
                guards.forEach(professional => {
                    const startTimeMorningHHMM = professional.h_start_morning.substring(0, 5)
                    const endTimeMorningHHMM = professional.h_end_morning.substring(0, 5)
                    const startTimeAfternoonHHMM = professional.h_start_afternoon.substring(0, 5)
                    const endTimeAfternoonHHMM = professional.h_end_afternoon.substring(0, 5)

                    if (professional.day_name === currentDay) {
                        if (startTimeMorningHHMM <= currentHour && currentHour <= endTimeMorningHHMM) {
                            if (professional.name_spe === 'Pharmacies') {
                                pharmacies.push(professional) 
                            } else if (professional.name_spe === 'Dentistes') {
                                dentists.push(professional) 
                            } else if (professional.name_spe === 'Médecins') {
                                doctors.push(professional) 
                            }
                        }
                        if (startTimeAfternoonHHMM <= currentHour && currentHour <= endTimeAfternoonHHMM) {
                            if (professional.name_spe === 'Pharmacies') {
                                pharmacies.push(professional) 
                            } else if (professional.name_spe === 'Dentistes') {
                                dentists.push(professional) 
                            } else if (professional.name_spe === 'Médecins') {
                                doctors.push(professional) 
                            }
                        }
                    }
                    
                })    
                /*Update the state with the categorized professionals*/
                setPharmacies(pharmacies)
                setDentists(dentists) 
                setDoctors(doctors)
        })
        .catch(err => console.error(err))
        }, 1000)
        /*Set an interval to update the current hour every 60 seconds*/
        const interval = setInterval(()=> {
            setCurrentHours(getCurrentHour())
        },6000)
        /* Cleanup function to clear the interval*/
        return () => clearInterval(interval)
    }, [guards, currentDay, currentHour])

    
    return (
        <section className="section-guards">
            <section className="presentation-guards">
                <h1 data-aos="fade-right" data-aos-duration="1500">Permanence des Soins et Urgences Médicales : <br/><em>Des Soins à Tout Moment</em></h1>
                <Clock />
            </section>

            <h2>{currentDay} {actualDate}</h2>
            

            <div className="guards-container">
                <PharmaciesOnCall />
                
                {pharmacies.length > 0 && <PharmaciesForGuards pharmacies={pharmacies} />}

                {dentists.length > 0 && <DentistsForGuards dentists={dentists} />}

                {doctors.length > 0 && <DoctorsForGuards doctors={doctors} />}
                
            </div>
        </section>
    )
}

