'use client'
import { useState } from 'react' 
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux' 
import Link from 'next/link'
import axios from 'axios'
import { connectAdmin } from '../../slices/adminSlice' 
import "./login.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
    const dispatch = useDispatch()
    const router = useRouter()

    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [error, setError] = useState('') 
    const [captachaValue, setCaptachaValue] = useState(null)

    const onCaptchaChange = (value) => {
        setCaptachaValue(value)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const onSubmitForm = (e) => {
        e.preventDefault() 
        setError(null)
    
        if (!validateEmail(email)) {
            setError("Adresse e-mail invalide")
            return
        }
    
        axios.post('/api/admin/login', { email, password }, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    let newAdmin = res.data.admin
                    if (!newAdmin) {
                        setError("Réponse du serveur incorrecte")
                        return
                    }
                    newAdmin.token = res.data.token
                    dispatch(connectAdmin(newAdmin))
                    router.push('/admin')
                } 
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    setError("Identification échouée : email ou mot de passe incorrect")
                } else {
                    setError("Une erreur est survenue")
                }
            }) 
    }
    

    return (
        <section className='container-login'>
            <h1>Connexion</h1>
            <form onSubmit={onSubmitForm} className='login-form'>
                <div className='area-input-login'>
                    <FontAwesomeIcon icon={faUser} className="icon-login"/>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.currentTarget.value) 
                        }}
                        placeholder='Email'
                        required
                    />
                </div>

                <div className='area-input-login'>
                    <FontAwesomeIcon icon={faLock} className="icon-login"/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.currentTarget.value) 
                        }}
                        placeholder='Mot de passe'
                        required
                    />
                </div>

                <input type="submit" 
                    name="Se connecter" 
                    className='login-button' 
                    value="Se connecter"
                />
            </form>

            <div className='forgot-password'>
                <Link href="/forgot-password">Mot de passe oublié</Link>
            </div>

            {error && <p className='error-message'>{error}</p>}
        </section>
    ) 
} 
