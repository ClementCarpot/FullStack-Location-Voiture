import React from 'react';
import '../assets/styles/header.css';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FlexUl } from '../assets/styles/CustomStyles';
import { CarRental, Logout, AccountCircle, Key, Home, Login, Email, People, EditCalendar } from '@mui/icons-material';

const Header = () => {
    const location = useLocation();
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            setUser(null);

            navigate('/', { replace: true });
        }
    };

    const getActivePage = () => {
        switch (location.pathname) {
            case '/':
                return 'accueil';
            case '/vehicules':
                return 'vehicules';
            case '/contact':
                return 'contact';
            case '/utilisateurs':
                return 'utilisateurs';
            case '/reservations':
                return 'reservations';
            case '/monCompte':
                return 'monCompte';
            case '/connexion':
                return 'connexion';
            case '/location':
                return 'location';
            case '/reservationManagement':
                return 'reservationManagement';
            default:
                return '';
        }
    };

    const active = getActivePage();

    return (
        <header>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>Location de Véhicules</h1>
            </Link>
            <nav>
                <FlexUl>
                    <li>
                        <Link to='/'>
                            <Box display='flex' alignItems='center'>
                                Accueil
                                <Home style={{ marginLeft: '5px' }} />
                            </Box>
                        </Link>
                    </li>
                    {user && user.role === 'CLIENT' && (
                        <li className={active === 'contact' ? 'active' : ''}>
                            <Link to='/contact'>
                                <Box display='flex' alignItems='center'>
                                    Nous contacter
                                    <Email style={{ marginLeft: '5px' }} />
                                </Box>
                            </Link>
                        </li>
                    )}
                    {!user && (
                        <>
                            <li className={active === 'connexion' ? 'active' : ''}>
                                <Link to='/connexion'>
                                    <Box display='flex' alignItems='center'>
                                        Connexion | Inscription
                                        <Login style={{ marginLeft: '5px' }} />
                                    </Box>
                                </Link>
                            </li>
                        </>
                    )}
                    <>
                        {user && user.role === 'CLIENT' && (
                            <li className={active === 'reservations' ? 'active' : ''}>
                                <Link to='/reservations'>
                                    <Box display='flex' alignItems='center'>
                                        Mes réservations
                                        <CarRental style={{ marginLeft: '5px' }} />
                                    </Box>
                                </Link>
                            </li>
                        )}
                        {user && user.role === 'ADMIN' && (
                            <>
                                <li className={active === 'utilisateurs' ? 'active' : ''}>
                                    <Link to='/utilisateurs'>
                                        <Box display='flex' alignItems='center'>
                                            Utilisateurs
                                            <People style={{ marginLeft: '5px' }} />
                                        </Box>
                                    </Link>
                                </li>
                                <li className={active === 'reservationManagement' ? 'active' : ''}>
                                    <Link to='/reservationManagement'>
                                        <Box display='flex' alignItems='center'>
                                            Gérer les réservations
                                            <EditCalendar style={{ marginLeft: '5px' }} />
                                        </Box>
                                    </Link>
                                </li>
                                <li className={active === 'vehicules' ? 'active' : ''}>
                                    <Link to='/vehicules'>
                                        <Box display='flex' alignItems='center'>
                                            Gérer les véhicules
                                            <EditCalendar style={{ marginLeft: '5px' }} />
                                        </Box>
                                    </Link>
                                </li>
                            </>
                        )}
                        {user && user.role === 'CLIENT' && (
                            <li className={active === 'location' ? 'active' : ''}>
                                <Link to='/location'>
                                    <Box display='flex' alignItems='center'>
                                        Louer un véhicule
                                        <Key style={{ marginLeft: '5px' }} />
                                    </Box>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <>
                                <li className={active === 'monCompte' ? 'active' : ''}>
                                    <Link to='/monCompte'>
                                        <Box display='flex' alignItems='center'>
                                            <AccountCircle style={{ marginLeft: '5px' }} />
                                        </Box>
                                    </Link>
                                </li>

                                <li className={'deconnexion'} onClick={handleLogout}>
                                    <Box display='flex' alignItems='center'>
                                        Deconnexion
                                        <Logout style={{ marginLeft: '5px' }} />
                                    </Box>
                                </li>
                            </>
                        )}
                    </>
                    )
                </FlexUl>
            </nav>
        </header>
    );
};

export default Header;
