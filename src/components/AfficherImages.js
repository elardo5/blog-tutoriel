import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AjouterImage from './AjouterImage'; // Importation par défaut

function AfficherImages({ tutorielId }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentaire, setCommentaire] = useState(''); // State pour le commentaire

    useEffect(() => {
        setLoading(true);
        axios.get(`http://blog-tutoriel-elardo.lovestoblog.com/images.php?tutoriel_id=${tutorielId}`)
            .then(response => {
                if (response.data.length > 0) {
                    setImage(response.data[0]); // Prendre la première image
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur:', error);
                setError('Erreur lors du chargement de l\'image.');
                setLoading(false);
            });
    }, [tutorielId]);

    const handleCommentSubmit = () => {
        if (!commentaire.trim()) {
            alert('Le commentaire ne peut pas être vide.');
            return;
        }

        axios.post('http://blog-tutoriel-elardo.lovestoblog.com/commentaires.php', {
            tutoriel_id: tutorielId,
            contenu: commentaire
        })
        .then(response => {
            console.log('Commentaire ajouté:', response.data);
            setCommentaire(''); // Réinitialiser le champ de commentaire après soumission
        })
        .catch(error => console.error('Erreur:', error));
    };

    if (loading) {
        return <p>Chargement de l'image...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>Image</h3>
            {image ? (
                <img 
                    src={`http://blog-tutoriel-elardo.lovestoblog.com/${image.chemin}`} 
                    alt={`Image du tutoriel ${tutorielId}`} 
                    width="200" // Ajustez la largeur selon vos besoins
                    height="auto" // Ajustez la hauteur pour conserver les proportions
                />
            ) : (
                <p>Aucune image disponible pour ce tutoriel.</p>
            )}

            <AjouterImage tutorielId={tutorielId} />

            {/* Champ de saisie pour ajouter un commentaire */}
            <div>
                <textarea
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                ></textarea>
                <button onClick={handleCommentSubmit}>
                    Ajouter Commentaire
                </button>
            </div>
        </div>
    );
}

export default AfficherImages;
