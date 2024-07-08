'use client'
import Image from 'next/image'
import { useRef, useState } from "react"
import emailjs from '@emailjs/browser'
import Modal from "../../components/Modal"
import ReCAPTCHA from "react-google-recaptcha"
import DOMPurify from "dompurify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import "./contact.css"

export default function Contact() {

    const [openModal, setOpenModal] = useState(false)
    const [message, setMessage] = useState('')
    const maxCharacters = 500 
    const [captchaValue, setCaptchaValue] = useState(null)

    const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID 
    const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID 
    const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY 

    const onCaptchaChange = (value) => {
        setCaptchaValue(value)
    }

    const handleChange = (e) => {
        const inputText = e.target.value
        if(inputText.length <= maxCharacters){
            setMessage(inputText)
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }
   
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()

        if (!captchaValue) {
            alert("Veuillez remplir le CAPTCHA")
            return
        }

        const formData = new FormData(form.current)
        const sanitizedData = {
            user_name: DOMPurify.sanitize(formData.get('user_name')),
            user_email: DOMPurify.sanitize(formData.get('user_email')),
            message: DOMPurify.sanitize(formData.get('message')),
            'g-recaptcha-response': captchaValue
        }

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, sanitizedData, EMAILJS_PUBLIC_KEY)
        .then((result) => {
            if(result.status === 200){
                setOpenModal(true) /
                setTimeout(()=> {
                    handleCloseModal() 
                }, 5000)
            }
            e.target.reset() 
            setMessage('')
            setCaptchaValue(null)
        }, (error) => {
                return(error.text) 
        })
    }
    
    return (
        <>
            <section className="container-contact">

                <div className="div-contact">
                    <h1 data-aos="fade-right" data-aos-duration="1500">Nous contacter</h1>
                    <p>Nous sommes là pour répondre à toutes les questions que vous vous posez sur nos soins de santé. Si vous avez besoin d&apos;informations sur nos professionnels de santé, notre équipe est là pour vous aider. </p>
                </div>

                <div className="container-form-contact">
                    <div className="container-img-contact">
                        <Image src="/images/team-medical.jpg" alt="Image d'une équipe médicale" id="img-medical-team" fill={true}/>
                    </div>
                
                    <form ref={form} onSubmit={sendEmail}>

                        <label>Nom</label>
                        <input type="text" 
                            name="user_name"
                            maxLength="50"
                            placeholder="Ex: Dupont Marie"
                            required 
                        />

                        <label>Email</label>
                        <input type="email" 
                            name="user_email"
                            maxLength="50"
                            placeholder="Ex: votreemail@gmail.com"
                            required 
                        />

                        <label>Message</label>
                        <textarea name="message" 
                                maxLength={maxCharacters} 
                                onChange={handleChange}
                                placeholder="Ecrivez votre message ou votre question ici"
                        />
                        <div className="character-count">
                            {maxCharacters - message.length} caractères restants
                        </div>

                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
                            onChange={onCaptchaChange} />

                        <div className="container-button-contact">
                            <button type="submit" className="contact-button">
                                Envoyer
                            <FontAwesomeIcon icon={faPaperPlane} className="icon-button-contact" />
                            </button>
                        </div>   
                    </form>
                </div>  
            </section>
            <Modal open={openModal} onClose={handleCloseModal} message="Message envoyé" />
        </>
    )
}

