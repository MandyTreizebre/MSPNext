import axios from "axios"
import {config} from "../config"

//Display toutes les informations
export function displayAllInformations() {

    return axios.get(`${config.api_url}/api/informations`)

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

//Display une information par son ID
export function displayInformationById(id) {
    
    return axios.get(`${config.api_url}/api/information/${id}`)

    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }
        console.log("res dans le then de api", res)
        return res
    })
    .catch((error)=> {
        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
        
        return error
    })
}

//Informations par catégorie
export function getInformationsByCategory(category) {

    return axios.get(`${config.api_url}/api/informations/${category}`)

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

//Display toutes les catégories
export function displayCategories() {

    return axios.get(`${config.api_url}/api/categories`)

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

//Ajouter une information
export function addInformation(datas, token) {

    return axios.post(`${config.api_url}/api/save-information`, datas, {

        headers: {
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true
    })
    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }
        return res
    })
    .catch((error)=> {
        if (error.response.data.msg === "Titre invalide") {
            throw new Error("Titre invalide")
        }

        if (error.response.data.msg === "Description invalide") {
            throw new Error("Description invalide")
        }

        if (error.response.data.msg === "Lien invalide") {
            throw new Error("Lien invalide")
        }

        if (error.response.data.msg === "Catégorie invalide") {
            throw new Error("Catégorie invalide")
        }

        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Mettre à jour une information
export function udpdateInformation(datas, id, token) {

    return axios.put(`${config.api_url}/api/update-information/${id}`, datas, {

        headers: {
            "Authorization": `Bearer ${token}` 
        },
        withCredentials: true 
    })
    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=> {
        if (error.response.data.msg === "Titre invalide") {
            throw new Error("Titre invalide")
        }

        if (error.response.data.msg === "Description invalide") {
            throw new Error("Description invalide")
        }

        if (error.response.data.msg === "Image invalide") {
            throw new Error("Lien invalide")
        }

        if (error.response.data.msg === "Lien invalide") {
            throw new Error("Lien invalide")
        }

        if (error.response.data.msg === "Catégorie invalide") {
            throw new Error("Catégorie invalide")
        }

        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Supprimer une information
export function deleteInformation(id, token){

    return axios.delete(`${config.api_url}/api/delete-information/${id}`, {

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
        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }

        return error
    })
}
