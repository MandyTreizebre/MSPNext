import axios from 'axios'
import {config} from '../config'


//Display toutes les actualités
export function displayAllNews() {

    return axios.get(`${config.api_url}/api/news`)

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

//Display une actualité par son ID
export function displayNewById(id){
    
    return axios.get(`${config.api_url}/api/new/${id}`)

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

//Ajouter une actualité
export function addNew(datas, token) {

    return axios.post(`${config.api_url}/api/save-new`, datas, {

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
        if (error.response.data.msg === "Titre invalide") {
            throw new Error("Titre invalide")
        }

        if (error.response.data.msg === "Description invalide") {
            throw new Error("Description invalide")
        }

        if (error.response.data.msg === "Image invalide") {
            throw new Error("Image invalide")
        }

        if (error.response.data.msg === "Lien invalide") {
            throw new Error("Lien invalide")
        }

        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Mettre à jours une actualité
export function updateNew(datas, id, token) {

    return axios.put(`${config.api_url}/api/update-new/${id}`, datas, {

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
        if (error.response.data.msg === "Titre invalide") {
            throw new Error("Titre invalide")
        }

        if (error.response.data.msg === "Description invalide") {
            throw new Error("Description invalide")
        }

        if (error.response.data.msg === "Image invalide") {
            throw new Error("Image invalide")
        }

        if (error.response.data.msg === "Lien invalide") {
            throw new Error("Lien invalide")
        }

        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Supprime rune actualité
export function deleteNew(id, token) { 

    return axios.delete(`${config.api_url}/api/delete-new/${id}`, {

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
    .catch((error )=>{
        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }

        return error
    })
}