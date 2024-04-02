import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Authentification = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: email,
            motDePasse: password,
        };

        fetch('http://localhost:8080/connexion/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    setPassword('');
                    throw new Error('Erreur lors de la connexion');
                }
                return response.text();
            })
            .then(data => {
                if (data) {
                    const jsonData = JSON.parse(data);

                    setUser(jsonData);

                    navigate('/');
                }
            })
            .catch(error => {
                console.error(error);
                setPassword('');
                alert('Erreur lors de la connexion');
            });
    };

    return (
        <Grid container className='center background'>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper style={{ padding: 16 }}>
                    <Typography variant='h5' align='center'>
                        Connexion
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Mot de passe'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button type='submit' fullWidth variant='contained' color='primary' style={{ marginTop: 16 }}>
                            Se connecter
                        </Button>
                        <Typography variant='body2' style={{ marginTop: 16 }}>
                            Vous n'avez pas de compte ? <a href='/inscription'>Inscrivez-vous</a>
                        </Typography>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Authentification;
