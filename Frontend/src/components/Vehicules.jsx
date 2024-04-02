import React, { useEffect, useState } from 'react';
import { CardContent, CardActions, Typography, Box } from '@mui/material';
import { formatString } from '../utils/StringUtils';
import Button from '@mui/material/Button';
import { StyledCard, StyledTypographie, StyledContainer } from '../assets/styles/CustomStyles';

const Vehicules = () => {
    const [vehicules, setVehicules] = useState([]);
    const [showMotos, setShowMotos] = useState(false);
    const [showVoitures, setShowVoitures] = useState(false);
    const [showUtilitaires, setShowUtilitaires] = useState(false);
    const [showVelos, setShowVelos] = useState(false);
    const [showCampingCars, setShowCampingCars] = useState(false);

    const fetchVehicules = () => {
        fetch('http://localhost:8080/vehicules')
            .then(response => response.json())
            .then(data => setVehicules(data.flat()))
            .catch(error => console.error('Erreur :', error));
    };

    useEffect(() => {
        fetchVehicules();
    }, []);

    const deleteVehicule = (typeVehicule, id) => {
        fetch(`http://localhost:8080/vehicules/${typeVehicule}/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetchVehicules())
            .catch(error => console.error('Erreur :', error));
    };

    const putBackVehicule = (typeVehicule, id) => {
        fetch(`http://localhost:8080/vehicules/${typeVehicule}/${id}/remettre`, {
            method: 'GET',
        })
            .then(() => fetchVehicules())
            .catch(error => console.error('Erreur :', error));
    };

    return (
        <Box className='background'>
            <StyledContainer style={{ backgroundColor: '#333', width: 600, borderRadius: 20 }}>
                <Box>
                    <Button variant={showMotos ? 'contained' : 'outlined'} onClick={() => setShowMotos(!showMotos)}>
                        Motos
                    </Button>
                    <Button
                        variant={showVoitures ? 'contained' : 'outlined'}
                        onClick={() => setShowVoitures(!showVoitures)}
                    >
                        Voitures
                    </Button>
                    <Button
                        variant={showUtilitaires ? 'contained' : 'outlined'}
                        onClick={() => setShowUtilitaires(!showUtilitaires)}
                    >
                        Utilitaires
                    </Button>
                    <Button variant={showVelos ? 'contained' : 'outlined'} onClick={() => setShowVelos(!showVelos)}>
                        Vélos
                    </Button>
                    <Button
                        variant={showCampingCars ? 'contained' : 'outlined'}
                        onClick={() => setShowCampingCars(!showCampingCars)}
                    >
                        Camping-cars
                    </Button>
                </Box>
            </StyledContainer>
            <StyledContainer>
                {vehicules.map(vehicule => {
                    if (vehicule.typeCampingCar && showCampingCars) {
                        return (
                            <StyledCard key={vehicule.id}>
                                <StyledTypographie variant='h5'>
                                    {vehicule.marque} {vehicule.modele}
                                </StyledTypographie>
                                <CardContent>
                                    <Typography>Couleur : {vehicule.couleur}</Typography>
                                    <Typography>Nombre de place : {vehicule.nombrePlaces}</Typography>
                                    <Typography>Tarif journalier : {vehicule.tarifJournalier} €</Typography>
                                    <Typography>Kilométrage : {vehicule.kilometrage}</Typography>
                                    <Typography>Actif : {vehicule.actif ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Retiré du parc : {vehicule.retireDuParc ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Type d'énergie : {formatString(vehicule.typeEnergie)}</Typography>
                                    <Typography>Transmission : {formatString(vehicule.transmission)}</Typography>
                                    <Typography>Climatisation : {vehicule.climatisation ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Poids à vide : {vehicule.poidsPATC} kg</Typography>
                                    <Typography>Hauteur : {vehicule.hauteur} m</Typography>
                                    <Typography>Nombre de couchages : {vehicule.nombreCouchages}</Typography>
                                    <Typography>
                                        Equipement cuisine : {vehicule.equipementCuisine ? 'Oui' : 'Non'}
                                    </Typography>
                                    <Typography>Linge de lit : {vehicule.lingeLit ? 'Oui' : 'Non'}</Typography>
                                    <Typography>
                                        Equipement réfrigérateur : {vehicule.equipementRefregirateur ? 'Oui' : 'Non'}
                                    </Typography>
                                    <Typography>
                                        Equipement douche : {vehicule.equipementDouche ? 'Oui' : 'Non'}
                                    </Typography>
                                    <Typography>
                                        Type de camping-car : {formatString(vehicule.typeCampingCar)}
                                    </Typography>
                                    <Typography>Permis nécessaire : {vehicule.permisNecessaire}</Typography>
                                    <CardActions className='center'>
                                        {!vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => deleteVehicule('campingCars', vehicule.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                        {vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='success'
                                                onClick={() => putBackVehicule('campingCars', vehicule.id)}
                                            >
                                                Remettre
                                            </Button>
                                        )}
                                    </CardActions>
                                </CardContent>
                            </StyledCard>
                        );
                    } else if (vehicule.typeUtilitaire && showUtilitaires) {
                        return (
                            <StyledCard key={vehicule.id}>
                                <StyledTypographie variant='h5'>
                                    {vehicule.marque} {vehicule.modele}
                                </StyledTypographie>
                                <CardContent>
                                    <Typography>Couleur : {vehicule.couleur}</Typography>
                                    <Typography>Nombre de place : {vehicule.nombrePlaces}</Typography>
                                    <Typography>Tarif journalier : {vehicule.tarifJournalier} €</Typography>
                                    <Typography>Kilométrage : {vehicule.kilometrage}</Typography>
                                    <Typography>Actif : {vehicule.actif ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Retiré du parc : {vehicule.retireDuParc ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Type d'énergie : {formatString(vehicule.typeEnergie)}</Typography>
                                    <Typography>Transmission : {formatString(vehicule.transmission)}</Typography>
                                    <Typography>Climatisation : {vehicule.climatisation ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Charge maximale : {vehicule.chargeMax} kg</Typography>
                                    <Typography>Poids à vide : {vehicule.poidsPATC} kg</Typography>
                                    <Typography>Capacité en mètre cube : {vehicule.capaciteMetreCube} m³</Typography>
                                    <Typography>Type d'utilitaire : {formatString(vehicule.typeUtilitaire)}</Typography>
                                    <Typography>Permis nécessaire : {vehicule.permisNecessaire}</Typography>
                                    <CardActions className='center'>
                                        {!vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => deleteVehicule('utilitaires', vehicule.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                        {vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='success'
                                                onClick={() => putBackVehicule('utilitaires', vehicule.id)}
                                            >
                                                Remettre
                                            </Button>
                                        )}
                                    </CardActions>
                                </CardContent>
                            </StyledCard>
                        );
                    } else if (vehicule.typeVoiture && showVoitures) {
                        return (
                            <StyledCard key={vehicule.id}>
                                <StyledTypographie variant='h5'>
                                    {vehicule.marque} {vehicule.modele}
                                </StyledTypographie>
                                <CardContent>
                                    <Typography>Couleur : {vehicule.couleur}</Typography>
                                    <Typography>Nombre de place : {vehicule.nombrePlaces}</Typography>
                                    <Typography>Tarif journalier : {vehicule.tarifJournalier} €</Typography>
                                    <Typography>Kilométrage : {vehicule.kilometrage}</Typography>
                                    <Typography>Actif : {vehicule.actif ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Retiré du parc : {vehicule.retireDuParc ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Type d'énergie : {formatString(vehicule.typeEnergie)}</Typography>
                                    <Typography>Nombre de portes : {vehicule.nombrePortes}</Typography>
                                    <Typography>Transmission : {formatString(vehicule.transmission)}</Typography>
                                    <Typography>Climatisation : {vehicule.climatisation ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Nombre de bagages : {vehicule.nombreBagages}</Typography>
                                    <Typography>Type de voiture : {formatString(vehicule.typeVoiture)}</Typography>
                                    <Typography>Permis nécessaire : {vehicule.permisNecessaire}</Typography>
                                    <CardActions className='center'>
                                        {!vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => deleteVehicule('voitures', vehicule.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                        {vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='success'
                                                onClick={() => putBackVehicule('voitures', vehicule.id)}
                                            >
                                                Remettre
                                            </Button>
                                        )}
                                    </CardActions>
                                </CardContent>
                            </StyledCard>
                        );
                    } else if (vehicule.typeMoto && showMotos) {
                        return (
                            <StyledCard key={vehicule.id}>
                                <StyledTypographie variant='h5'>
                                    {vehicule.marque} {vehicule.modele}
                                </StyledTypographie>
                                <CardContent>
                                    <Typography>Couleur : {vehicule.couleur}</Typography>
                                    <Typography>Tarif journalier : {vehicule.tarifJournalier} €</Typography>
                                    <Typography>Kilométrage : {vehicule.kilometrage}</Typography>
                                    <Typography>Actif : {vehicule.actif ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Retiré du parc : {vehicule.retireDuParc ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Nombre de cylindres : {vehicule.nombreDeCylindres}</Typography>
                                    <Typography>Cylindrée : {vehicule.cylindree} cm³</Typography>
                                    <Typography>Poids : {vehicule.poids} kg</Typography>
                                    <Typography>Puissance : {vehicule.puissanceKW} kW</Typography>
                                    <Typography>Hauteur de selle : {vehicule.hauteurSelle} mm</Typography>
                                    <Typography>Transmission : {formatString(vehicule.transmission)}</Typography>
                                    <Typography>Type de moto : {formatString(vehicule.typeMoto)}</Typography>
                                    <Typography>Permis nécessaire : {vehicule.permisNecessaire}</Typography>
                                    <CardActions className='center'>
                                        {!vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => deleteVehicule('motos', vehicule.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                        {vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='success'
                                                onClick={() => putBackVehicule('motos', vehicule.id)}
                                            >
                                                Remettre
                                            </Button>
                                        )}
                                    </CardActions>
                                </CardContent>
                            </StyledCard>
                        );
                    } else if (vehicule.typeVelo && showVelos) {
                        return (
                            <StyledCard key={vehicule.id}>
                                <StyledTypographie variant='h5'>
                                    {vehicule.marque} {vehicule.modele}
                                </StyledTypographie>
                                <CardContent>
                                    <Typography>Couleur : {vehicule.couleur}</Typography>
                                    <Typography>Tarif journalier : {vehicule.tarifJournalier} €</Typography>
                                    <Typography>Kilométrage : {vehicule.kilometrage}</Typography>
                                    <Typography>Actif : {vehicule.actif ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Retiré du parc : {vehicule.retireDuParc ? 'Oui' : 'Non'}</Typography>
                                    <Typography>Taille du cadre : {vehicule.tailleCadre} cm</Typography>
                                    <Typography>Poids : {vehicule.poidsKg} kg</Typography>
                                    <Typography>Electrique : {vehicule.isElectrique ? 'Oui' : 'Non'}</Typography>
                                    {vehicule.isElectrique && (
                                        <>
                                            <Typography>Autonomie : {vehicule.batterie.autonomieKm} km</Typography>
                                            <Typography>
                                                Capacité de la batterie : {vehicule.batterie.capaciteKwh} kWh
                                            </Typography>
                                        </>
                                    )}
                                    <Typography>Freins à disque : {vehicule.freinsDisque ? 'Oui' : 'Non'}</Typography>
                                    <Typography>
                                        Type de vélo :{' '}
                                        {vehicule.typeVelo === 'VTT'
                                            ? vehicule.typeVelo
                                            : formatString(vehicule.typeVelo)}
                                    </Typography>
                                    <CardActions className='center'>
                                        {!vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => deleteVehicule('velos', vehicule.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                        {vehicule.retireDuParc && (
                                            <Button
                                                variant='contained'
                                                color='success'
                                                onClick={() => putBackVehicule('velos', vehicule.id)}
                                            >
                                                Remettre
                                            </Button>
                                        )}
                                    </CardActions>
                                </CardContent>
                            </StyledCard>
                        );
                    } else {
                        return null;
                    }
                })}
            </StyledContainer>
        </Box>
    );
};

export default Vehicules;
