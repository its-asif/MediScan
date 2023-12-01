import React, { createContext, useContext, useEffect, useState } from 'react';
import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const auth = getAuth(app);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic(); 

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);


            // ADD some JWT logic
            if(currentUser){
                // // todo : get token and store client
                const userInfo = { email : currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then( res =>{
                        if( res.data.token ){
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else{
                // // todo : remove token (if token stored in the client side : local storage, caching, in memory) 
                localStorage.removeItem('access-token');
                setLoading(false);

            }

        })
        return () =>{
            return unsubscribe();
        }
     }, [axiosPublic]);

    const authInfo = {
        user, loading, createUser, signIn, logout, updateUserProfile
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;