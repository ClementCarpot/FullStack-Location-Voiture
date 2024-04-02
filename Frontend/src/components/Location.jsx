import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import { CarRental } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
    const [vehicules, setVehicules] = useState([]);
    const [accessoires, setAccessoires] = useState([]);
    const [vehicule, setVehicule] = useState('');
    const [accessoire, setAccessoire] = useState([]);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [nombreKmParcourus, setNombreKmParcourus] = useState(0);
    const [prixTotal, setPrixTotal] = useState(0);

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8080/vehicules')
            .then(response => response.json())
            .then(data => setVehicules(data.flat()));

        fetch('http://localhost:8080/accessoires')
            .then(response => response.json())
            .then(data => setAccessoires(data));
    }, []);

    useEffect(() => {
        let prixVehicule = 0;
        let prixAccessoires = 0;

        if (vehicule) {
            prixVehicule += vehicule.tarifJournalier;
        }

        accessoire.forEach(a => {
            const accessoireSelectionne = accessoires.find(acc => acc.id === a);
            if (accessoireSelectionne) {
                prixAccessoires += accessoireSelectionne.montantUnitaire;
            }
        });

        if (dateDebut && dateFin) {
            const nbJours = Math.ceil((new Date(dateFin) - new Date(dateDebut)) / (1000 * 60 * 60 * 24)) + 1;
            prixVehicule *= nbJours;
        }

        let prixTotal = prixVehicule + prixAccessoires;

        setPrixTotal(prixTotal);
    }, [vehicule, accessoire, dateDebut, dateFin, accessoires, vehicules]);

    const handleSubmit = () => {
        const data = {
            client: { id: user.id },
            vehicule: { id: vehicule.id, type: 'voiture' },
            accessoires: accessoire.map(id => ({ id: id })),
            dateDebut,
            dateFin,
            nombreKmParcourus: parseInt(nombreKmParcourus),
        };

        fetch('http://localhost:8080/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
                }
                alert('Réservation effectuée avec succès !');
                navigate('/reservations');
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    };

    return (
        <Box className='center background'>
            <Card>
                <CardContent>
                    <Typography variant='h5' component='div' gutterBottom>
                        Réservation
                    </Typography>
                    <TextField
                        select
                        label='Véhicule | tarif journalier'
                        value={vehicule ? vehicule.id : ''}
                        onChange={e => {
                            const vehicule = vehicules.find(v => v.id === e.target.value);
                            setVehicule(vehicule);
                        }}
                        SelectProps={{ style: { width: '350px' } }}
                    >
                        {vehicules.map((vehicule, index) => (
                            <MenuItem key={index} value={vehicule.id}>
                                {vehicule.marque + ' ' + vehicule.modele + ' | (' + vehicule.tarifJournalier} € / jours)
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label={
                            accessoire.length > 0 && accessoire.length < 2
                                ? 'Accessoire'
                                : accessoire.length > 1
                                ? 'Accessoires'
                                : 'Sélectionnez vos accessoires'
                        }
                        value={accessoire}
                        onChange={e => setAccessoire(e.target.value)}
                        SelectProps={{
                            multiple: true,
                            style: { width: '300px' },
                        }}
                        disabled={!vehicule}
                    >
                        {accessoires
                            .filter(accessoire => {
                                if (
                                    vehicule.modele === 'Ordu' ||
                                    vehicule.modele === 'Speedmax CFR 8' ||
                                    vehicule.modele === 'E-EXPL 520'
                                ) {
                                    return accessoire.accessoirePourTypeVehicule === 'VELO';
                                } else if (
                                    vehicule.modele === 'Panigale V4' ||
                                    vehicule.modele === 'Ninja ZX-10R' ||
                                    vehicule.modele === 'YZF-R1'
                                ) {
                                    return accessoire.accessoirePourTypeVehicule === 'MOTO';
                                } else if (
                                    vehicule.modele === 'Model S' ||
                                    vehicule.modele === 'Model Y' ||
                                    vehicule.modele === 'Civic' ||
                                    vehicule.modele === 'Corolla'
                                ) {
                                    return accessoire.accessoirePourTypeVehicule === 'VOITURE';
                                } else if (
                                    vehicule.modele === 'Ducato' ||
                                    vehicule.modele === 'Sprinter' ||
                                    vehicule.modele === 'Kangoo'
                                ) {
                                    return accessoire.accessoirePourTypeVehicule === 'UTILITAIRE';
                                } else if (
                                    vehicule.modele === 'Master' ||
                                    vehicule.modele === 'Maxity' ||
                                    vehicule.modele === 'California'
                                ) {
                                    return accessoire.accessoirePourTypeVehicule === 'CAMPING_CAR';
                                }
                                return true;
                            })
                            .map((accessoire, index) => (
                                <MenuItem key={index} value={accessoire.id}>
                                    {accessoire.nom + ': ' + accessoire.montantUnitaire} €
                                </MenuItem>
                            ))}
                    </TextField>
                    <TextField
                        label='Date de début'
                        type='date'
                        value={dateDebut}
                        onChange={e => setDateDebut(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label='Date de fin'
                        type='date'
                        value={dateFin}
                        onChange={e => setDateFin(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        style={{ width: 170 }}
                        label='Nombre de km à parcourir'
                        type='number'
                        value={nombreKmParcourus}
                        onChange={e => setNombreKmParcourus(e.target.value)}
                    />
                    <TextField
                        style={{ width: 100 }}
                        label='Prix total'
                        type='text'
                        disabled
                        value={prixTotal + ' €'}
                        onChange={e => setPrixTotal(e.target.value)}
                    />
                </CardContent>
                <Box sx={{ paddingBottom: 2 }} display='flex' justifyContent='center'>
                    <Button variant='contained' endIcon={<CarRental />} onClick={handleSubmit}>
                        Réserver
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default Reservation;
