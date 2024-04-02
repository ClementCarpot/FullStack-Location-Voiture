import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [key, setKey] = useState(Date.now());

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
            const storedUserImage = localStorage.getItem(`userImage-${user.id}`);
            if (storedUserImage) {
                setUserImage(storedUserImage);
            }
        }
    }, [key]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            if (userImage) {
                localStorage.setItem(`userImage-${user.id}`, userImage);
            }
        } else {
            localStorage.removeItem('user');
            if (user && user.id) {
                localStorage.removeItem(`userImage-${user.id}`);
            }
        }
    }, [user, userImage]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userImage,
                setUserImage,
                refreshUser: () => setKey(Date.now()),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
