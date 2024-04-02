import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Accueil from './Accueil';
import Vehicules from './Vehicules';
import Reservations from './Reservations';
import Contact from './Contact';
import MonCompte from './MonCompte.jsx';
import Utilisateurs from './Utilisateurs.jsx';
import Connexion from './Connexion.jsx';
import Inscription from './Inscription.jsx';
import Erreur404 from './Erreur404';
import Location from './Location';
import ReservationManagement from './ReservationManagement';

const RoutesComponent = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Accueil />} />
                <Route path='/vehicules' element={<Vehicules />} />
                <Route path='/utilisateurs' element={<Utilisateurs />} />
                <Route path='/reservations' element={<Reservations />} />
                <Route path='/reservationManagement' element={<ReservationManagement />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/monCompte' element={<MonCompte />} />
                <Route path='/connexion' element={<Connexion />} />
                <Route path='/inscription' element={<Inscription />} />
                <Route path='/location' element={<Location />} />

                <Route path='*' element={<Erreur404 />} />
            </Routes>
        </>
    );
};

export default RoutesComponent;
