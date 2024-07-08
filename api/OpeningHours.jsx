import axios from 'axios'
import {config} from '../config'


//Display tous les horaires
export function displayOpeningHours() {

    return axios.get(`${config.api_url}/api/opening-hours`)

    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=> {
        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }

        return error
    })
}

//Display les horaires d'un professionnel
export function getOpeningHoursByPro(pro_id, day_id) {

    return axios.get(`${config.api_url}/api/pro/opening-hours/${pro_id}/${day_id}`)

    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=> {
        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }

        return error
    })
}

//Ajouter des horaires
export function saveOpeningHours(datas, token) {

    return axios.post(`${config.api_url}/api/save/opening-hours`, datas, {

        headers: {
            "Authorization": `Bearer ${token}` 
        },
        withCredentials: true
    })
    .then((res)=>{
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=>{
        if(error.response.data.msg === "Professionnel invalide") {
            throw new Error("Professionnel invalide")
        }

        if(error.response.data.msg === "Jour invalide") {
            throw new Error("Jour invalide")
        }

        if(error.response.data.msg === "Heure de début du matin invalide") {
            throw new Error("Heure de début du matin invalide")
        }

        if(error.response.data.msg === "Heure de fin du matin invalide") {
            throw new Error("Heure de fin du matin invalide")
        }

        if(error.response.data.msg === "Heure de début de l'après-midi invalide") {
            throw new Error("Heure de début de l'après-midi invalide")
        }

        if(error.response.data.msg === "Heure de fin de l'après-midi invalide") {
            throw new Error("Heure de fin de l'après-midi invalide")
        }

        if(error.response.data.msg === "Des horaires existent déjà pour ce jour et ce professionnel.") {
            throw new Error("Des horaires existent déjà pour ce jour et ce professionnel.")
        }

        if(error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Mettre à jour les horaires
export function editOpeningHoursByPro(datas, pro_id, token) {


    return axios.put(`${config.api_url}/api/edit/opening-hours/${pro_id}`, datas, {

        headers: {
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true
    })
    .then((res)=>{
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=>{
        if(error.response.data.msg === "Professionnel invalide") {
            throw new Error("Professionnel invalide")
        }

        if(error.response.data.msg === "Jour invalide") {
            throw new Error("Jour invalide")
        }

        if(error.response.data.msg === "Heure de début du matin invalide") {
            throw new Error("Heure de début du matin invalide")
        }

        if(error.response.data.msg === "Heure de fin du matin invalide") {
            throw new Error("Heure de fin du matin invalide")
        }

        if(error.response.data.msg === "Heure de début de l'après-midi invalide") {
            throw new Error("Heure de début de l'après-midi invalide")
        }

        if(error.response.data.msg === "Heure de fin de l'après-midi invalide") {
            throw new Error("Heure de fin de l'après-midi invalide")
        }

        if(error.response.data.msg === "Des horaires existent déjà pour ce jour et ce professionnel.") {
            throw new Error("Des horaires existent déjà pour ce jour et ce professionnel.")
        }

        if(error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Display les jours
export function displayDays() { 

    return axios.get(`${config.api_url}/api/days`)

    .then((res)=>{
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=>{
        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }

        return error
    })
}

