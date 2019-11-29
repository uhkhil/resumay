
import * as firebase from "firebase/app";
import "firebase/auth";

let loggedIn = false;

const subcribeAuthStateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loggedIn = true
            console.log('TCL: checkSession -> user', user);
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
        var token = result.credential.accessToken;
        console.log('TCL: login -> token', token);
        var user = result.user;
        console.log('TCL: login -> user', user);
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