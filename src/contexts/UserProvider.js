import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useApi } from './ApiProvider';

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState();
    const api = useApi();

    useEffect(()=> {
        (async () => {
            if (api.isAuthenticated()) {
                const response = await api.get('/me');
                setUser(response.ok ? response.body : null);
            }
            else {
                setUser(null);
            }
        })();
    }, [api]);

    const login = useCallback(async (username, password) => {
        const result = await api.login(username, password);
        if (result === 'ok') {
            const response = await api.get('/me');
            setUser(response.ok ? response.body : null);
            // return response.ok;
        }
        return result;
    }, [api]);

    const loginSigaa = useCallback(async () => {
        const result = await api.loginSigaa();
        console.log('result em userProvider > loginSigaa => ' + JSON.stringify(result))
        return result;
    }, [api]);

    const loginSigaaCallback = useCallback(async (code, state) => {
        const result = await api.loginSigaaCallback(code, state);
        console.log('userProvider.loginSigaaCallback -> ' + JSON.stringify(result))
        if (result === 'ok') {
            const response = await api.get('/me');
            console.log('response.body -> ' + JSON.stringify(response.body));
            setUser(response.ok ? response.body : null);
            // return response.ok;
        }
        return result;
    }, [api]);

    const logout = useCallback(async () => {
        await api.logout();
        setUser(null);
    }, [api]);

    return (
        <UserContext.Provider value={{user, setUser, login, loginSigaa, loginSigaaCallback, logout}}>
            {children}
        </UserContext.Provider>        
    );
}

export function useUser() {
    return useContext(UserContext);
}