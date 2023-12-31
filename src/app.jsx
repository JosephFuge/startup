import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CreateGame } from './creategame/creategame';
import { AuthState } from './login/authState';
import { About } from './about/about';
import { Login } from './login/login';
import { PlayGame } from './playgame/playgame';
import { Header } from './header/header';
import './main.css';

export default function App() { 
    const [userName, setUserName] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <Header authState={authState} setAuthState={setAuthState} userName={userName} />

                <Routes>
                    <Route path='/' element={<Login 
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                                setAuthState(authState);
                                setUserName(userName);
                            }
                        }
                        />} exact />
                    <Route path='/creategame' element={<CreateGame />} />
                    <Route path='/playgame' element={<PlayGame />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>

                
                <footer>
                    <p>Author: Joseph Fuge</p>
                    <a href="https://github.com/JosephFuge/startup">GitHub</a>   
                </footer>   
            </div>
        </BrowserRouter>
    );
}