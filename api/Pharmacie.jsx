import axios from 'axios' 
import { config } from '../config' 

// Récupérer toutes les pharmacies de gardes
export function displayAllPharmaciesOnCallAPI() {
    return axios.get(`${config.api_url}/api/pharmacies-on-call`)
        .then((res) => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error("Erreur lors de la connexion") 
            }
            
            return res
        })
        .catch((error) => {
            if (error.response.status === 500) {
                throw new Error("Erreur interne du serveur") 
            }
            return error 
        }) 
}

// Récupérer les pharmacies par jour
export function displayPharmaciesAndSchedules() {
    return axios.get(`${config.api_url}/api/pharmacies-on-call-schedules`)
        .then((res) => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error("Erreur lors de la connexion") 
            }

            return res 
        })
        .catch((error) => {
            if (error.response.status === 500) {
                throw new Error("Erreur interne du serveur") 
            }

            return error 
        }) 
}

// Ajouter les pharmacies de garde
export function addPharmaciesOnCallAPI(datas, token) {
    return axios.post(`${config.api_url}/api/save-pharmacies-on-call`, datas, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true
    })
        .then((res) => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error("Erreur lors de la connexion") 
            }

            return res 
        })
        .catch((error) => {
            if (error.response.data.msg === "Nom invalide") {
                throw new Error("Nom invalide") 
            }

            if (error.response.data.msg === "Adresse invalide") {
                throw new Error("Adresse invalide") 
            }

            if (error.response.data.msg === "Téléphone invalide") {
                throw new Error("Téléphone invalide") 
            }

            if (error.response.status === 500) {
                throw new Error("Erreur interne du serveur") 
            }
        }) 
}

// Ajouter les gardes pour une pharmacie
export function addSchedulesPharmaciesOnCallAPI(datas, token) {
    return axios.post(`${config.api_url}/api/save-schedules-pharmacies-on-call`, datas, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true
    })
        .then((res) => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error("Erreur lors de la connexion") 
            }

            return res 
        })
        .catch((error) => {
            if (error.response.status === 500) {
                throw new Error("Erreur interne du serveur") 
            }
        }) 
}
