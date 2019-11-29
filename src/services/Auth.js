
import * as firebase from "firebase/app";
import "firebase/auth";

let loggedIn = false;

const subcribeAuthStateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loggedIn = true
        } else {
            loggedIn = false;
            console.log('no user')
        }
    })

}

const checkSession = () => {
    return loggedIn;
}

const login = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const result = await firebase.auth().signInWithPopup(provider)
        const token = result.credential.accessToken;
        const user = result.user;
        // TODO: Inform server if just signed up
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const logout = async () => {
    await firebase.auth().signOut()
    return true;
}

export const Auth = {
    subcribeAuthStateChange,
    checkSession,
    login,
    logout
}