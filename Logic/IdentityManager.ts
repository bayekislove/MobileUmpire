import * as SecureStore from 'expo-secure-store';

const fetchDest : string = "https://mobile-umpire.onrender.com";
const loggedUserKey = "loggedUser";
const tokenKey = "token";

export default class IdentityManager {

    static async loggedUser() {
        let result = await (SecureStore.getItemAsync(loggedUserKey)) as string;
        return result ? result : "User not logged";
    }

    static async setToken(token : string) {
        await SecureStore.setItemAsync(tokenKey, token);
    }

    static async getToken() : Promise<string> {
        const token = await SecureStore.getItemAsync(tokenKey);
        return token ? token : "";
    }

    static async Login(login: string, password: string) : Promise<boolean> {
        let isUserLoggedCorrectly : boolean = false;
        await fetch(fetchDest + '/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: login,
                password: password
            })
        })
        .then((res) => {
            if(res.status == 200) {
                isUserLoggedCorrectly = true;
                return res.json();
            };
        })
        .then((res) => {
            console.log("Setting token" + res.token);
            IdentityManager.setToken(res.token);
        })
        .catch((err) => console.log(err));

        if(isUserLoggedCorrectly) {
            await SecureStore.setItemAsync(loggedUserKey, login);
        }
        return isUserLoggedCorrectly;
    }

    static async Register(login: string, password: string, repeatedPassword: string) {
        // if(password != repeatedPassword) {
        //     return false;
        // };

        let isUserRegisteredCorrectly : boolean = false;
        await fetch(fetchDest + '/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: login,
                password: password
            })
        }).then((res) => {
            console.log(JSON.stringify(res));
            console.log(res.status);
            isUserRegisteredCorrectly = res.status == 200;
        })
        .catch((err) => console.log(err));

        return isUserRegisteredCorrectly;
    }

    static async Logout() {
        await SecureStore.deleteItemAsync(loggedUserKey);
        await SecureStore.deleteItemAsync(tokenKey);
    }
}