import React from 'react';
import '../assets/styles/background.css';
import { Card, CardContent, Typography } from '@mui/material';

const Accueil = () => {
    return (
        <div className='background'>
            <Card style={{ maxWidth: 345, margin: 'auto', marginTop: 50, backgroundColor: '#333', color: 'salmon' }}>
                <CardContent>
                    <Typography variant='h5' textAlign={'center'} gutterBottom>
                        Bienvenue dans notre application de gestion de parc automobile
                    </Typography>
                    <Typography variant='body2' color='textSecondary' style={{ color: 'white' }} component='div'>
                        Voici quelques fonctionnalités de notre application :
                        <ul>
                            <li>Gestion du parc automobile en tant qu'administrateur</li>
                            <li>Réservation de véhicules en tant que client</li>
                            <li>Visualisation des réservations en cours</li>
                        </ul>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Accueil;
