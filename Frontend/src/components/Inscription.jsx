import React, { useContext, useState } from 'react';
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [listePermis, setListePermis] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adresse, setAdresse] = useState({ rue: '', ville: '', codePostal: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const { setUserImage } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const passwordDoesntMatch = () => {
        setPassword('');
        setConfirmPassword('');
        alert('Les mots de passe ne correspondent pas');
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            passwordDoesntMatch();
        } else {
            const user = {
                nom: name,
                prenom: firstName,
                adresse: adresse,
                email: email,
                dateNaissance: dateNaissance,
                permis: listePermis,
                motDePasse: password,
            };

            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                const response = await fetch('https://api.imgbb.com/1/upload?key=bf7dfb308a4b5902a7271ed415ddd915', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();

                if (result.success) {
                    setUserImage(result.data.url);
                } else {
                    alert("Erreur lors de l'upload de l'image");
                }
            }

            fetch('http://localhost:8080/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de l'inscription");
                    } else {
                        alert('Inscription réussie');
                        navigate('/connexion');
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert("Erreur lors de l'inscription");
                });
        }
    };

    return (
        <Grid container className='center background'>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper style={{ padding: 16, margin: 30 }}>
                    <Typography variant='h5' align='center'>
                        Inscription
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Nom'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Prénom'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Rue'
                            value={adresse.rue}
                            onChange={e => setAdresse({ ...adresse, rue: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Ville'
                            value={adresse.ville}
                            onChange={e => setAdresse({ ...adresse, ville: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Code Postal'
                            value={adresse.codePostal}
                            onChange={e => setAdresse({ ...adresse, codePostal: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Date de naissance'
                            type='date'
                            value={dateNaissance}
                            onChange={e => setDateNaissance(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                        <FormControl fullWidth margin='normal'>
                            <InputLabel id='permis'>Permis</InputLabel>
                            <Select
                                labelId='permis'
                                multiple
                                value={listePermis}
                                onChange={e => setListePermis(e.target.value)}
                            >
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'A1'}>A1</MenuItem>
                                <MenuItem value={'A2'}>A2</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                                <MenuItem value={'C1'}>C1</MenuItem>
                                <MenuItem value={'D1'}>D1</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Mot de passe'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Confirmer le mot de passe'
                            type='password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Box>
                            <Typography>Image de profil</Typography>
                            <input type='file' onChange={handleFileChange} />
                        </Box>
                        <Button type='submit' fullWidth variant='contained' color='primary' style={{ marginTop: 16 }}>
                            S'inscrire
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Inscription;
