import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, CardContent, Typography, Button } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { StyledCardReservation, StyledContainer, StyledTypographie } from '../assets/styles/CustomStyles';
import { formatDate } from '../utils/DateUtils';
import { formatString } from '../utils/StringUtils';

const ReservationManagement = () => {
    const { user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);

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

    const validateReservation = id => {
        fetch(`http://localhost:8080/locations/${id}/valider`, {
            method: 'GET',
        }).then(() => {
            setReservations(
                reservations.map(reservation => {
                    if (reservation.id === id) {
                        reservation.etatLocation = 'VALIDEE';
                    }
                    return reservation;
                })
            );
        });
    };

    return (
        <Box className='center background'>
            <StyledContainer>
                <Grid container spacing={3} justifyContent='center'>
                    {user &&
                        reservations.map(reservation => (
                            <Grid item xs={12} sm={6} md={4} key={reservation.id}>
                                <StyledCardReservation>
                                    <CardContent>
                                        <StyledTypographie variant='h5' gutterBottom>
                                            {reservation.vehicule.marque} {reservation.vehicule.modele}
                                        </StyledTypographie>
                                        <Typography>
                                            Du {formatDate(reservation.dateDebut)} au {formatDate(reservation.dateFin)}
                                        </Typography>
                                        <Typography>Kilométre prévu : {reservation.nombreKmParcourus}</Typography>
                                        <Typography>Prix : {reservation.montantLocation} €</Typography>
                                        <Typography gutterBottom>
                                            Etat : {formatString(reservation.etatLocation)}
                                        </Typography>
                                        <Button
                                            variant='contained'
                                            color='error'
                                            onClick={() => deleteReservation(reservation.id)}
                                        >
                                            Supprimer
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='success'
                                            style={{ marginTop: 20 }}
                                            onClick={() => validateReservation(reservation.id)}
                                        >
                                            Valider la réservation
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

export default ReservationManagement;
