import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AjouterCommentaire from './AjouterCommentaire'; // Assurez-vous que ce fichier existe

function Commentaires({ tutorielId }) {
    const [commentaires, setCommentaires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost/votre_projet/commentaires.php?tutoriel_id=${tutorielId}`)
            .then(response => {
                setCommentaires(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur:', error);
                setError('Erreur lors du chargement des commentaires.');
                setLoading(false);
            });
    }, [tutorielId]);

    if (loading) {
        return <p>Chargement des commentaires...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>Commentaires</h3>
            {commentaires.length > 0 ? (
                commentaires.map(commentaire => (
                    <div key={commentaire.id}>
                        <h4>{commentaire.auteur}</h4>
                        <p>{commentaire.contenu}</p>
                    </div>
                ))
            ) : (
                <p>Aucun commentaire pour ce tutoriel. Soyez le premier à commenter !</p>
            )}
            <AjouterCommentaire tutorielId={tutorielId} />
        </div>
    );
}

export default Commentaires; // Exportation par défaut
