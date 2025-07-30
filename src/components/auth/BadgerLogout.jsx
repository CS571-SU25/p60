import React, {useEffect} from 'react';
import {useContext} from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';


export default function BadgerLogout()
{

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);


    useEffect(() =>
    {
        fetch('https://cs571api.cs.wisc.edu/rest/su25/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json =>
        {
            // Clear login status and sessionStorage
            setLoginStatus(null);
            sessionStorage.removeItem("loginStatus");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
