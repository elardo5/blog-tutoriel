import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tutoriels from './components/Tutoriels';
import AjouterTutoriel from './components/AjouterTutoriel';
import AjouterImage from './components/AjouterImage';
import AfficherImages from './components/AfficherImages';


function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Blog Tutoriel elardo pro</h1>
                </header>
                <nav>
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/ajouter">Ajouter un Tutoriel</a></li>
                    </ul>
                </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<Tutoriels />} />
                        <Route path="/ajouter" element={<AjouterTutoriel />} />
                        <Route path="/ajouterImage" element={<AjouterImage />} />
                        <Route path="/AfficherImages" element={<AfficherImages />} />
                        
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
