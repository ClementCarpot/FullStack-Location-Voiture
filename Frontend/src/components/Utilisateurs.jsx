import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Box, Button } from '@mui/material';
import { format } from 'date-fns';
import '../assets/styles/center.css';
import { StyledCard, StyledTypographie } from '../assets/styles/CustomStyles';

const Utilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/clients')
            .then(response => response.json())
            .then(data => setUtilisateurs(data));
    }, []);

    const deleteUser = id => {
        fetch(`http://localhost:8080/clients/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.id !== id));
        });
    };

    return (
        <Box className='center background' style={{ display: 'flex', flexWrap: 'wrap' }}>
            {utilisateurs.map(
                utilisateur =>
                    utilisateur.dateNaissance && (
                        <StyledCard key={utilisateur.id} style={{ whiteSpace: 'nowrap', width: '350px' }}>
                            <StyledTypographie variant='h5'>
                                {utilisateur.prenom} {utilisateur.nom}
                            </StyledTypographie>
                            <CardContent>
                                <Typography>Email : {utilisateur.email}</Typography>
                                {utilisateur.role === 'CLIENT' && (
                                    <div>
                                        <Typography>
                                            Adresse :{' '}
                                            {utilisateur.adresse.rue +
                                                ', ' +
                                                utilisateur.adresse.ville +
                                                ', ' +
                                                utilisateur.adresse.codePostal}
                                        </Typography>
                                        <Typography>
                                            Date de naissance :{' '}
                                            {format(new Date(utilisateur.dateNaissance), 'dd/MM/yyyy')}
                                        </Typography>
                                        <Typography>
                                            Date d'inscription :{' '}
                                            {format(new Date(utilisateur.dateInscription), 'dd/MM/yyyy')}
                                        </Typography>

                                        <Typography>Permis : [{utilisateur.permis.join(', ')}]</Typography>
                                    </div>
                                )}
                            </CardContent>
                            <div className='center'>
                                <Button
                                    aria-label='delete'
                                    variant='contained'
                                    color='error'
                                    style={{ marginBottom: 10 }}
                                    onClick={() => deleteUser(utilisateur.id)}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </StyledCard>
                    )
            )}
        </Box>
    );
};

export default Utilisateurs;
