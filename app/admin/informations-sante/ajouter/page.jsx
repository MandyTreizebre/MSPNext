'use client'
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
const token = Cookies.get('token')
import axios from 'axios';
import AddHealthInformationsForm from "@/components/Admin/Forms/AddHealthInformationsForm";
import Modal from "@/components/Modal";

export default function AddInformations() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [pictureUrl, setPictureUrl] = useState("") 
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState("");
    const [openAddInformationModal, setOpenAddInformationModal] = useState(false);

    const handleCloseModal = () => {
        setOpenAddInformationModal(false);
    };
    useEffect(() => {
        axios.get('/api/categories-informations')
            .then((res) => {
                setCategory(res.data);
            })
            .catch(err => {
                setError(err, "Erreur lors du chargement des catégories");
            });
    }, []);

    const saveInformation = (datas, token) => {
        axios.post('/api/informations', datas, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
            .then((res) => {
                if (res.status === 201) {
                    setTitle("");
                    setDescription("");
                    setLink("");
                    setPictureUrl("") 
                    setSelectedCategory(null);
                    
                    setOpenAddInformationModal(true);
                    setTimeout(() => {
                        handleCloseModal();
                    }, 5000);
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.msg) {
                    setError(err.response.data.msg);
                } else {
                    setError("Une erreur est survenue");
                }
            });
    };

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('link', link);
        formData.append('pictureUrl', pictureUrl) 
        formData.append('category', selectedCategory)

        console.log("formData =>", formData)

        saveInformation(formData, token);
    };

    console.log("selectedCategory", selectedCategory)
    
    return (
        <>
            <section className="form-container">
                <h1>Ajouter une information</h1>
                <p className="required-p">Les champs suivis d&apos; un <span className="required-asterisk">*</span> sont obligatoires.</p>
                <AddHealthInformationsForm
                    title={title}
                    description={description}
                    pictureUrl={pictureUrl}
                    link={link}
                    categoriesList={category}
                    onChangeTitle={setTitle}
                    onChangeDescription={setDescription}
                    onChangePicture={setPictureUrl}
                    onChangeLink={setLink}
                    onChangeCategory={setSelectedCategory}
                    handleSubmit={handleSubmit}
                />
                {error && <div className="error-message">{error}</div>}
                <Modal open={openAddInformationModal} onClose={handleCloseModal} message="Information ajoutée" />
            </section>
        </>
    );
}
