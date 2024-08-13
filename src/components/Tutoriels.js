import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tutoriels() {
    const [tutoriels, setTutoriels] = useState([]);
    const [commentaire, setCommentaire] = useState('');
    const [commentaires, setCommentaires] = useState({});

    useEffect(() => {
        // Charger les tutoriels
        axios.get('http://localhost/blog-tutoriel/tutoriels.php')
            .then(response => {
                setTutoriels(response.data);
                // Charger les commentaires pour chaque tutoriel
                response.data.forEach(tutoriel => {
                    fetchCommentaires(tutoriel.id);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }, []);

    const fetchCommentaires = (tutorielId) => {
        axios.get(`http://localhost/blog-tutoriel/commentaires.php?tutoriel_id=${tutorielId}`)
            .then(response => setCommentaires(prevState => ({
                ...prevState,
                [tutorielId]: response.data
            })))
            .catch(error => console.error('Erreur lors du chargement des commentaires:', error));
    };

    const handleCommentSubmit = (e, tutorielId) => {
        e.preventDefault();
        axios.post('http://localhost/blog-tutoriel/commentaires.php', {
            tutoriel_id: tutorielId,
            commentaire: commentaire
        })
        .then(response => {
            console.log('Commentaire ajouté:', response.data);
            setCommentaire(''); // Réinitialiser le champ de commentaire après soumission
            fetchCommentaires(tutorielId); // Recharger les commentaires après l'ajout
        })
        .catch(error => console.error('Erreur lors de l\'ajout du commentaire:', error));
    };

    return (
        <div>
            <h1>Tutoriels</h1>
            {tutoriels.map(tutoriel => (
                <div key={tutoriel.id}>
                    <h2>{tutoriel.titre}</h2>
                    <p>{tutoriel.description}</p>
                    {tutoriel.images && (
                        <img 
                            src={`http://localhost/blog-tutoriel/uploads/${tutoriel.images}`} 
                            alt={`Image pour ${tutoriel.titre}`} 
                            width="200" 
                            height="auto" 
                        />
                    )}
                    <h3>Commentaires</h3>
                    {commentaires[tutoriel.id] && commentaires[tutoriel.id].length > 0 ? (
                        commentaires[tutoriel.id].map(commentaire => (
                            <p key={commentaire.id}>{commentaire.commentaire}</p>
                        ))
                    ) : (
                        <p>Aucun commentaire pour ce tutoriel.</p>
                    )}
                    <form onSubmit={(e) => handleCommentSubmit(e, tutoriel.id)}>
                        <input 
                            type="text" 
                            value={commentaire} 
                            onChange={(e) => setCommentaire(e.target.value)} 
                            placeholder="Ajouter un commentaire" 
                            required 
                        />
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            ))}
        </div>
    );
}

export default Tutoriels;
