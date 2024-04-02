import './App.css';
import Routes from './components/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes />
            </Router>
        </AuthProvider>
    );
};

export default App;
