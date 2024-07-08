import axios from "axios"
import { config } from "../config"

//Ajouter un admin
export function registerAdmin(datas,  token) {

    return axios.post(`${config.api_url}/api/register`, datas, { 
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
    .catch((error) => {
        if (error.response.data.msg === "Entrez un email") {
            throw new Error("Entrez un email")
        }

        if (error.response.data.msg === "Adresse email invalide") {
            throw new Error("Adresse email invalide")
        }
        
        if (error.response.data.msg === "Entrez un prénom" ) {
            throw new Error("Entrez un prénom" )
        }

        if (error.response.data.msg === "Prénom invalide" ) {
            throw new Error("Prénom invalide" )
        }

        if (error.response.data.msg === "Email déjà utilisé." ) {
            throw new Error("Email déjà utilisé." )
        }

        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

// Login 
export function loginAdmin(datas) {

    return axios.post(`${config.api_url}/api/login`, datas,{ withCredentials: true })
    
    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        } 
        
        return res
        
    })
    .catch((error) => {
        if (error.response.status === 400) {
            throw new Error("Identification échouée : email ou mot de passe incorrect")
        }

        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Envoi un email si l'admin oublie son mot de passe 
export function forgotPassword(email) {

    return axios.post(`${config.api_url}/api/forgot-password`, {email})

    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=>{
        if (error.response.data.msg === "Adresse email invalide") {
            throw new Error("Adresse email invalide")
        }

        if (error.response.data.msg === "Vérifiez votre adresse mail") {
            throw new Error("Vérifiez votre adresse mail")
        }
        
        if (error.response.data.msg === "Erreur interne" ) {
            throw new Error("Erreur interne" )
        }

        if (error.response.data.msg === "Prénom invalide" ) {
            throw new Error("Prénom invalide" )
        }

        if (error.response.data.msg === "Email déjà utilisé." ) {
            throw new Error("Email déjà utilisé." )
        }

        if (error.response.status === 500) {
            throw new Error("Erreur interne du serveur")
        }
    })
}

//Réinitialisation du mot de passe 
export function resetPassword(data) {

    return axios.post(`${config.api_url}/api/reset-password`, data)

    .then((res)=> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error( "Erreur lors de la connexion")
        }

        return res
    })
    .catch((error)=> {
        console.log("error dans le fichier api =>", error)
        if (error.response.data.msg === "Adresse email invalide") {
            throw new Error("Adresse email invalide")
        }

        if (error.response.data.msg === "Erreur dans l'adresse mail") {
            throw new Error("Erreur dans l'adresse mail")
        }

        if (error.response.data.msg === "Token invalide ou expiré") {
            throw new Error("Token invalide ou expiré")
        }

        if (error.response.data.msg === "Token invalide") {
            throw new Error("Token invalide")
        }
    })
}

//Vérif du token
export function checkMyToken(token) {

    return axios.get(`${config.api_url}/api/admin/checkToken`, { 

        headers: {
            "Authorization": `Bearer ${token}` 
        },
        withCredentials: true 
    })
    .then((res)=> {
        return res
    })
    .catch((err) => {
        return err 
    })
}

//Déconnexion
export function logout() {

    return axios.get(`${config.api_url}/api/logout`, {

        withCredentials: true
    })
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}


