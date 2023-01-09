import * as SecureStore from 'expo-secure-store';

const fetchDest : string = "http://192.168.1.24:8080"
const loggedUserKey = "loggedUser";

export default class IdentityManager {
    static async loggedUser() {
        let result = await (SecureStore.getItemAsync(loggedUserKey)) as string;
        return result ? result : "User not logged";
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
            isUserLoggedCorrectly = res.status == 200;
        })
        .catch((err) => console.log("błąd"));
        if(isUserLoggedCorrectly) {
            await SecureStore.setItemAsync(loggedUserKey, login);
        }
        return isUserLoggedCorrectly;
    }

    static async Register(login: string, password: string, repeatedPassword: string) {
        if(password != repeatedPassword) {
            return false;
        };

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
            isUserRegisteredCorrectly = res.status == 200;
        });
        if(isUserRegisteredCorrectly) {
            await SecureStore.setItemAsync(loggedUserKey, login);
        }
        return isUserRegisteredCorrectly;
    }

    static async Logout() {
        await SecureStore.deleteItemAsync(loggedUserKey);
    }
}