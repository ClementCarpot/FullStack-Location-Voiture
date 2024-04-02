import { styled } from '@mui/system';
import { Typography, Card, Container, Button, IconButton } from '@mui/material';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: '20px',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const StyledCardReservation = styled(Card)({
    backgroundColor: '#f5f5f5',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
    margin: '20px',
    padding: '5px',
});

const StyledCardMonCompte = styled(Card)({
    backgroundColor: '#f5f5f5',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: '350px',
    textAlign: 'center',
    margin: '20px',
    padding: '5px',
});

const StyledTypographie = styled(Typography)({
    textAlign: 'center',
    marginBottom: '30px',
});

const StyledButton = styled(Button)({
    height: '100%',
});

const StyledCard = styled(Card)({
    backgroundColor: '#f5f5f5',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
    margin: '20px',
    padding: '5px',
});

const FlexUl = styled('ul')({
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

const StyledDeleteButton = styled(IconButton)({
    color: 'red',
});

const StyledEditButton = styled(IconButton)({
    color: 'blue',
});

export {
    StyledContainer,
    StyledCardReservation,
    StyledTypographie,
    StyledCardMonCompte,
    StyledButton,
    StyledCard,
    StyledDeleteButton,
    StyledEditButton,
    FlexUl,
};
