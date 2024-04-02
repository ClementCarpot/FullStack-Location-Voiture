import React, { useEffect } from 'react';
import image404 from '../assets/images/404.png';
import { styled } from '@mui/system';

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
});

const StyledImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
});

const Page404 = () => {
    useEffect(() => {
        document.body.classList.add('erreur404');

        return () => {
            document.body.classList.remove('erreur404');
        };
    }, []);

    return (
        <Container>
            <StyledImage src={image404} alt='Erreur 404' />
        </Container>
    );
};

export default Page404;
