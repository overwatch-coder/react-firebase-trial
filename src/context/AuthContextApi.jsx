import { 
        GoogleAuthProvider, 
        signInWithPopup, 
        signOut,
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        updateProfile,
        signInWithEmailAndPassword, 
        deleteUser,
        reauthenticateWithCredential,
    } from 'firebase/auth';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import React, { createContext, useState, useEffect } from 'react';

import { auth, storage } from '../firebase';

export const AuthContext = createContext();

const AuthContextApi = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setIsAuth(true);
                const { displayName, email, photoURL, uid } = currentUser;
                setUser({
                    name: displayName, 
                    email, 
                    photoURL, 
                    uid
                });
            }else{
                setIsAuth(false);
            } 
        });

        return () => {
            unsubscribe();
        }
    
    }, []);

    // Sign in with gmail
    const signInWithGmail = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, googleProvider);
                const {user} = result;
            if(user){
                window.location.pathname = '/';
            }else{
                window.location.pathname = '/login';
                setError('');
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

    // create new user account with email and password
    const createAccountWithEmailandPassword = async (email, password, displayName) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = result;
            if(user){
                updateProfile(auth.currentUser, {
                    displayName: displayName
                }).then(() => {
                    window.location.pathname = '/';
                    setError('');
                })
            }
        } catch (error) {
            console.log('Error creating account');
            setError(error.message.slice(10));
        }
    }

    // sign in with email and password
    const loginWithEmailAndPassword = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password); 
            console.log(result);
            const { user } = result;
            if(user){
                window.location.pathname = '/';
                setError('');
            }
        } catch (error) {
            console.log('Error signing into account');
            setError(error.message.slice(10));
        }
    }

    // update user picture
    const updateUserPhoto = async (photo) => {
        const photoRef = ref(storage, `user-photos/${auth.currentUser.uid}.png`);
        try {
            const result = await uploadBytes(photoRef, photo);
            if(result){
                const photoURL = await getDownloadURL(photoRef);
                updateProfile(auth.currentUser, {photoURL})
                .then(() => {
                    window.location.pathname = '/';
                });
            }
        } catch (error) {
            console.log({error})
        }
    }

    // sign user out
    const signOutUser = async () => {
        try {
            await signOut(auth);
            setIsAuth(false);
            window.location = '/login';
        } catch (error) {
            console.log('Error');
        }
    }

    // delete user account
    const deleteAccount = async (email, password) => {
        const credential = {email, password}
        const success = await reauthenticateWithCredential(auth.currentUser, credential);
        if(success){
            const deleted = await deleteUser(auth.currentUser);
            if(deleted){
                window.location.pathname = '/register';
            }
        }
    }

  return (
    <AuthContext.Provider 
        value = 
        {{ 
            signInWithGmail, 
            isAuth, 
            signOutUser,
            user,
            createAccountWithEmailandPassword,
            loginWithEmailAndPassword,
            error,
            setError,
            updateUserPhoto,
            deleteAccount
        }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextApi