import React, { useState } from 'react';
import axios from 'axios';

function AjouterImage({ tutorielId }) {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            setMessage('Veuillez sélectionner une image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('tutoriel_id', tutorielId);

        axios.post('http://localhost/blog-tutoriel/upload.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log(response.data);
            setMessage('Image téléchargée avec succès !');
            setImage(null); // Réinitialiser l'image
        })
        .catch(error => {
            console.error('Erreur:', error);
            setMessage('Erreur lors du téléchargement de l\'image.');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} accept="image/*" required />
            <button type="submit">Ajouter Image</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default AjouterImage; // Exportation par défaut
