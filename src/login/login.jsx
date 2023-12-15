import React, { createContext, useContext, useState } from 'react';
import { AuthState } from './authState';
import { Unauthenticated } from './unauthenticated';
import { GameSelect } from '../gameselect/gameselect';

export function Login({userName, authState, onAuthChange }) {

    return (
        <main className='container-fluid bg-secondary text-center'>
            <div>
                {authState === AuthState.Unauthenticated || authState === AuthState.Unknown && <h1>Welcome to Simon</h1>}
                {authState === AuthState.Authenticated && (
                <GameSelect currentUser={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                    userName={userName}
                    onLogin={(loginUserName) => {
                    onAuthChange(loginUserName, AuthState.Authenticated);
                    }}
                />
                )}
            </div>
        </main> 
    );
}
