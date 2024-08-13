// src/components/Commentaires.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AjouterCommentaire from './AjouterCommentaire'; // Assurez-vous que ce fichier existe

function Commentaires({ tutorielId }) {
    const [commentaires, setCommentaires] = useState([]);

    useEffect(() => {
        axios.get(`/api/commentaires.php?tutoriel_id=${tutorielId}`)
            .then(response => setCommentaires(response.data))
            .catch(error => console.error('Erreur:', error));
    }, [tutorielId]);

    return (
        <div>
            <h3>Commentaires</h3>
            {commentaires.map(commentaire => (
                <div key={commentaire.id}>
                    <h4>{commentaire.auteur}</h4>
                    <p>{commentaire.contenu}</p>
                </div>
            ))}
            <AjouterCommentaire tutorielId={tutorielId} />
        </div>
    );
}

export default Commentaires; // Exportation par défaut
