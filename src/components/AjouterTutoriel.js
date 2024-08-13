import React, { useState } from 'react';
import axios from 'axios';

function AjouterTutoriel() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Afficher un aperçu de l'image
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        axios.post('http://blog-tutoriel-elardo.lovestoblog.com/tutoriels.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log(response.data);
            // Réinitialisation des champs
            setTitre('');
            setDescription('');
            setImage(null);
            setImagePreview(null); // Réinitialiser l'aperçu de l'image
        })
        .catch(error => console.error('Erreur:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={titre} 
                onChange={e => setTitre(e.target.value)} 
                placeholder="Titre" 
                required 
            />
            <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Description" 
                required 
            />
            <input 
                type="file" 
                onChange={handleImageChange} 
                accept="image/*" 
            />
            {imagePreview && (
                <div>
                    <h4>Aperçu de l'image :</h4>
                    <img src={imagePreview} alt="Aperçu" width="200" />
                </div>
            )}
            <button type="submit">Ajouter Tutoriel</button>
        </form>
    );
}

export default AjouterTutoriel;
