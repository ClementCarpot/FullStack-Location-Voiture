import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleNameChange = e => {
        setName(e.target.value);
        if (e.target.validity.valid) {
            setNameError(false);
        } else {
            setNameError(true);
        }
    };

    const handleEmailChange = e => {
        setEmail(e.target.value);
        if (e.target.validity.valid) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            alert('Envoi du message...');
        } else {
            alert('Merci de renseigner correctement les champs du formulaire.');
        }
    };

    return (
        <Grid container className='center background'>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper style={{ padding: 16 }}>
                    <Typography variant='h5' align='center'>
                        Contactez nous
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate>
                        <TextField
                            id='name'
                            name='name'
                            label='Nom'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={name}
                            onChange={handleNameChange}
                            error={nameError}
                            inputProps={{ pattern: "^[a-zA-ZÀ-ÿ-' ]+$" }}
                            helperText={nameError ? 'Merci de renseigner votre nom (lettres et espaces seulement)' : ''}
                            required
                        />
                        <TextField
                            id='email'
                            name='email'
                            label='Email'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                            helperText={emailError ? 'Email invalide' : ''}
                            inputProps={{ type: 'email' }}
                            required
                        />
                        <TextField
                            id='message'
                            name='message'
                            label='Message'
                            variant='outlined'
                            multiline
                            rows={4}
                            fullWidth
                            margin='normal'
                            required
                        />
                        <Box textAlign='center'>
                            <Button variant='contained' color='primary' type='submit' endIcon={<SendIcon />}>
                                Envoyer
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Contact;
