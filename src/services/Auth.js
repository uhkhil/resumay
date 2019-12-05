
import * as firebase from "firebase/app";
import "firebase/auth";
import { API } from "./API";

let loggedIn = false;
let accessToken = null;
let idToken = null;

const subcribeAuthStateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loggedIn = true
        } else {
            loggedIn = false;
        }
    })
}

const checkSession = () => {
    return loggedIn;
}

const setSession = async () => {
    idToken = await firebase.auth().currentUser.getIdToken();
    return true;
}

const login = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const result = await firebase.auth().signInWithPopup(provider)
        accessToken = result.credential.accessToken;
        if (result.additionalUserInfo.isNewUser) {
            const providerId = result.additionalUserInfo.providerId;
            const profile = result.additionalUserInfo.profile;
            await API.createResume({ providerId, profile });
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const logout = async () => {
    try {
        await firebase.auth().signOut()
        return true;
    } catch (error) {
        return false;
    }
}

const user = () => firebase.auth().currentUser;

const getToken = () => ({ accessToken, idToken })

export const Auth = {
    subcribeAuthStateChange,
    checkSession,
    setSession,
    login,
    logout,
    user,
    getToken
}