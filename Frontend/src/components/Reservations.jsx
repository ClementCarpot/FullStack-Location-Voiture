import React, { useEffect, useState, useContext } from 'react';
import { Typography, CardContent, Grid, Button, Box } from '@mui/material';
import { formatString } from '../utils/StringUtils';
import { formatDate } from '../utils/DateUtils';
import { AuthContext } from '../contexts/AuthContext';
import { StyledContainer, StyledCardReservation, StyledTypographie } from '../assets/styles/CustomStyles';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8080/locations')
            .then(response => response.json())
            .then(data => {
                setReservations(data);
            });
    }, []);

    const deleteReservation = id => {
        fetch(`http://localhost:8080/locations/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setReservations(reservations.filter(reservation => reservation.id !== id));
        });
    };

    return (
        <Box className='background'>
            <StyledContainer>
                <Grid container spacing={3} justifyContent='center'>
                    {user &&
                        reservations
                            .filter(reservation => reservation.client.id === user.id)
                            .map(reservation => (
                                <Grid item xs={12} sm={6} md={4} key={reservation.id}>
                                    <StyledCardReservation>
                                        <CardContent>
                                            <StyledTypographie variant='h5' gutterBottom>
                                                {reservation.vehicule.marque} {reservation.vehicule.modele}
                                            </StyledTypographie>
                                            <Typography>
                                                Du {formatDate(reservation.dateDebut)} au{' '}
                                                {formatDate(reservation.dateFin)}
                                            </Typography>
                                            <Typography>Kilométre prévu : {reservation.nombreKmParcourus}</Typography>
                                            <Typography>Prix : {reservation.montantLocation} €</Typography>
                                            <Typography gutterBottom>
                                                Etat : {formatString(reservation.etatLocation)}
                                            </Typography>
                                            <Button variant='contained' color='info' style={{ marginRight: '30px' }}>
                                                Editer
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => deleteReservation(reservation.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        </CardContent>
                                    </StyledCardReservation>
                                </Grid>
                            ))}
                </Grid>
            </StyledContainer>
        </Box>
    );
};

export default Reservations;
