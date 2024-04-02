import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Grid, CardContent, TextField, MenuItem, IconButton, Box } from '@mui/material';
import { StyledContainer, StyledCardMonCompte, StyledTypographie, StyledButton } from '../assets/styles/CustomStyles';
import { Edit } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

const MonCompte = () => {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(user);
    const { userImage, setUserImage } = useContext(AuthContext);
    const [hovering, setHovering] = useState(false);

    const [disabled, setDisabled] = useState({
        nom: true,
        prenom: true,
        ville: true,
        rue: true,
        codePostal: true,
        email: true,
        permis: true,
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch(`http://localhost:8080/clients/${user.id}`);
            if (!response.ok) {
                console.error("Erreur lors de la récupération des informations de l'utilisateur");
            } else {
                const data = await response.json();
                setUserInfo(data);
            }
        };
        if (user) {
            fetchUserInfo();
        }
    }, [user]);

    const handleButtonClick = async field => {
        if (!disabled[field]) {
            let data;
            if (field === 'ville' || field === 'rue' || field === 'codePostal') {
                data = { adresse: { ...userInfo.adresse, [field]: userInfo.adresse[field] } };
            } else {
                data = { [field]: userInfo[field] };
            }

            const response = await fetch(`http://localhost:8080/clients/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Erreur lors de la mise à jour des informations de l'utilisateur", text);
            } else {
                const text = await response.text();
                if (text) {
                    const updatedData = JSON.parse(text);
                    setUserInfo(prevUserInfo => ({
                        ...prevUserInfo,
                        ...updatedData,
                    }));
                }
            }
        }

        setDisabled({
            ...disabled,
            [field]: !disabled[field],
        });
    };

    const handleImageChange = e => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setUserImage(e.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleChange = e => {
        if (e.target.name === 'ville' || e.target.name === 'rue' || e.target.name === 'codePostal') {
            setUserInfo({
                ...userInfo,
                adresse: {
                    ...userInfo.adresse,
                    [e.target.name]: e.target.value,
                },
            });
        } else {
            setUserInfo({
                ...userInfo,
                [e.target.name]: e.target.value,
            });
        }
    };

    const permisOptions = ['A', 'A1', 'A2', 'B', 'C1', 'D1'];

    if (!userInfo) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    } else {
        return (
            <div className='background'>
                <StyledContainer>
                    <Grid container justifyContent='center'>
                        <StyledCardMonCompte>
                            <CardContent>
                                <StyledTypographie variant='h5'>Informations du compte</StyledTypographie>
                                <Grid
                                    item
                                    style={{
                                        position: 'relative',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 'auto',
                                    }}
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                >
                                    <img
                                        src={userImage}
                                        alt='profil'
                                        style={{
                                            height: '100%',
                                            width: 'auto',
                                        }}
                                    />
                                    {hovering && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => document.getElementById('fileInput').click()}
                                        >
                                            <IconButton color='primary' component='span'>
                                                <Edit style={{ color: '#fff' }} />
                                            </IconButton>
                                            <input
                                                id='fileInput'
                                                type='file'
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    )}
                                </Grid>
                                <Grid container alignItems='center' marginBottom='20px' marginTop='20px'>
                                    <Grid item xs={8}>
                                        <TextField
                                            label='Nom'
                                            value={userInfo.nom}
                                            onChange={handleChange}
                                            name='nom'
                                            disabled={disabled.nom}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <StyledButton onClick={() => handleButtonClick('nom')} variant='contained'>
                                            <Edit />
                                        </StyledButton>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems='center' marginBottom='20px'>
                                    <Grid item xs={8}>
                                        <TextField
                                            label='Prénom'
                                            value={userInfo.prenom}
                                            onChange={handleChange}
                                            name='prenom'
                                            disabled={disabled.prenom}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <StyledButton onClick={() => handleButtonClick('prenom')} variant='contained'>
                                            <Edit />
                                        </StyledButton>
                                    </Grid>
                                </Grid>
                                {userInfo.dateNaissance && (
                                    <>
                                        <Grid container alignItems='center' marginBottom='20px'>
                                            <Grid item xs={8}>
                                                <TextField
                                                    label='Ville'
                                                    value={userInfo.adresse.ville}
                                                    onChange={handleChange}
                                                    name='ville'
                                                    disabled={disabled.ville}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <StyledButton
                                                    onClick={() => handleButtonClick('ville')}
                                                    variant='contained'
                                                >
                                                    <Edit />
                                                </StyledButton>
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems='center' marginBottom='20px'>
                                            <Grid item xs={8}>
                                                <TextField
                                                    label='Rue'
                                                    value={userInfo.adresse.rue}
                                                    onChange={handleChange}
                                                    name='rue'
                                                    disabled={disabled.rue}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <StyledButton
                                                    onClick={() => handleButtonClick('rue')}
                                                    variant='contained'
                                                >
                                                    <Edit />
                                                </StyledButton>
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems='center' marginBottom='20px'>
                                            <Grid item xs={8}>
                                                <TextField
                                                    label='Code Postal'
                                                    value={userInfo.adresse.codePostal}
                                                    onChange={handleChange}
                                                    name='codePostal'
                                                    disabled={disabled.codePostal}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <StyledButton
                                                    onClick={() => handleButtonClick('codePostal')}
                                                    variant='contained'
                                                >
                                                    <Edit />
                                                </StyledButton>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                                <Grid container alignItems='center' marginBottom='20px'>
                                    <Grid item xs={8}>
                                        <TextField
                                            label='Email'
                                            value={userInfo.email}
                                            onChange={handleChange}
                                            name='email'
                                            disabled={disabled.email}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <StyledButton onClick={() => handleButtonClick('email')} variant='contained'>
                                            <Edit />
                                        </StyledButton>
                                    </Grid>
                                </Grid>
                                {userInfo.permis && (
                                    <Grid container alignItems='center'>
                                        <Grid item xs={8}>
                                            <TextField
                                                fullWidth
                                                select
                                                label='Permis'
                                                value={userInfo.permis}
                                                onChange={handleChange}
                                                name='permis'
                                                SelectProps={{
                                                    multiple: true,
                                                }}
                                                disabled={disabled.permis}
                                            >
                                                {permisOptions.map(option => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <StyledButton
                                                onClick={() => handleButtonClick('permis')}
                                                variant='contained'
                                            >
                                                <Edit />
                                            </StyledButton>
                                        </Grid>
                                    </Grid>
                                )}
                            </CardContent>
                        </StyledCardMonCompte>
                    </Grid>
                </StyledContainer>
            </div>
        );
    }
};

export default MonCompte;
