import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';


export default function CallbackPage() {
    const { loginSigaaCallback, setUser } = useUser();
    const api = useApi();
    const navigate = useNavigate();
    const { search } = useLocation();
    const location = useLocation();
    const flash = useFlash();
    const code = new URLSearchParams(search).get('code');
    const state = new URLSearchParams(search).get('state');
    // console.log("code = "+ code + " state = " + state);

    useEffect(()=> {
        (async () => {
            const result = await loginSigaaCallback(code, state);
            console.log("CallbackPage.loginSigaacallback = " + JSON.stringify(result));
            if (result === 'ok') {
                let next = '/';
                // console.log("next => " + next);
                console.log("location => " + JSON.stringify(location));
                if (location.state && location.state.next) {
                    next = location.state.next;
                }
                navigate(next);
            }
            // else if (result === 'fail') {
            //     flash('Invalid username or password', 'danger');
            // }   
        })();
    }, []);

 
    return (
        <></>
    );
}