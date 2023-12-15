import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AuthState } from './login/authState';
import { About } from './about/about';
import { Login } from './login/login';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

export default function App() { 
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header>
                    <h1><svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">

                        <g>
                            <title>Layer 1</title>
                            <rect id="svg_1" height="518" width="37" y="36" x="305" stroke="#000" fill="#FFFFFF"/>
                            <rect id="svg_2" height="518" width="37" y="36" x="512" stroke="#000" fill="#FFFFFF"/>
                            <rect transform="rotate(-90 422.5 184)" id="svg_3" height="518" width="37" y="-75" x="404" stroke="#000" fill="#FFFFFF"/>
                            <rect transform="rotate(-90 422.5 402)" id="svg_4" height="518" width="37" y="143" x="404" stroke="#000" fill="#FFFFFF"/>
                            <path stroke="#000" id="svg_6" d="m170.32499,94.8975l0,0c0,-34.51779 27.98221,-62.5 62.5,-62.5l0,0c16.57602,0 32.47315,6.5848 44.19417,18.30582c11.72103,11.72103 18.30584,27.61814 18.30584,44.19418l0,0c0,34.51779 -27.98221,62.5 -62.5,62.5l0,0c-34.51779,0 -62.5,-27.98221 -62.5,-62.5zm31.25,0l0,0c0,17.25889 13.99111,31.25 31.25,31.25c17.2589,0 31.25,-13.99111 31.25,-31.25c0,-17.25889 -13.99111,-31.25 -31.25,-31.25l0,0c-17.25889,0 -31.25,13.99111 -31.25,31.25z" fill="#007fff"/>
                            <path id="svg_8" d="m559.09506,459.60339l31.27592,-31.27592l33.22392,33.22365l33.22392,-33.22365l31.27621,31.27592l-33.22393,33.22392l33.22393,33.22392l-31.27621,31.27621l-33.22392,-33.22393l-33.22392,33.22393l-31.27592,-31.27621l33.22365,-33.22392l-33.22365,-33.22392z" stroke="#000" fill="#ff0000"/>
                            <rect id="svg_11" height="41.15266" width="3.74115" y="4.12031" x="14" stroke="#000" fill="#FFFFFF"/>
                            <rect id="svg_12" height="41.15266" width="3.74115" y="3.91809" x="32" stroke="#000" fill="#FFFFFF"/>
                            <rect id="svg_13" height="41.15266" width="3.74115" y="3.91809" x="32" stroke="#000" fill="#FFFFFF"/>
                            <rect transform="rotate(90 24.6693 14.8888)" stroke="#000" id="svg_14" height="41.15266" width="3.74115" y="-5.68757" x="22.79879" fill="#FFFFFF"/>
                            <rect transform="rotate(90 24.8716 34.1001)" stroke="#000" id="svg_15" height="41.15266" width="3.74115" y="13.52374" x="23.00102" fill="#FFFFFF"/>
                            <path stroke="#000" strokeWidth="0" id="svg_16" d="m37.15098,39.16139l2.05922,-2.05922l2.18748,2.18746l2.18748,-2.18746l2.05924,2.05922l-2.18748,2.18748l2.18748,2.18748l-2.05924,2.05924l-2.18748,-2.18748l-2.18748,2.18748l-2.05922,-2.05924l2.18746,-2.18748l-2.18746,-2.18748z" fill="#ff0000"/>
                            <path strokeWidth="0" stroke="#000" id="svg_17" d="m3.74856,7.44546l0,0c0,-2.40124 1.94659,-4.34782 4.34782,-4.34782l0,0c1.15311,0 2.259,0.45807 3.07438,1.27345c0.81538,0.81538 1.27345,1.92126 1.27345,3.07438l0,0c0,2.40124 -1.94659,4.34782 -4.34782,4.34782l0,0c-2.40124,0 -4.34782,-1.94659 -4.34782,-4.34782zm2.17391,0l0,0c0,1.20062 0.97329,2.17391 2.17391,2.17391c1.20062,0 2.17391,-0.97329 2.17391,-2.17391c0,-1.20062 -0.97329,-2.17391 -2.17391,-2.17391l0,0c-1.20062,0 -2.17391,0.97329 -2.17391,2.17391z" fill="#007fff"/>
                        </g>
                    </svg>Recursive TicTacToe Startup - Home</h1>
                    <nav>
                        {authState === AuthState.Unauthenticated && (
                            <NavLink to="/" className="rounded-button">
                                <svg className="nav-button-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path fill="currentColor" d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"/></svg><p className="nav-button-text"> Home</p>
                            </NavLink>
                        )}
                        <NavLink to="/about" className="rounded-button"><svg className="nav-button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/></svg>
                            <p className="nav-button-text"> About</p>
                        </NavLink>
                        {/* {authState === AuthState.Authenticated && (
                            <NavLink to="">

                            </NavLink>
                        )} */}
                    </nav>
                    {authState === AuthState.Authenticated && (
                        <div id="usernameBlock">
                        <p>Logged in as:</p>
                        <h2 id="userNameText">{userName}</h2>
                    </div>
                    )}
                </header>

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
                    {/* <Route path='/gameselect' element={<Play />} /> */}
                    {/* <Route path='/scores' element={<Scores />} /> */}
                    <Route path='/about' element={<About />} />
                    {/* <Route path='*' element={<NotFound />} /> */}
                </Routes>

                
                <footer>
                    <p>Author: Joseph Fuge</p>
                    <a href="https://github.com/JosephFuge/startup">GitHub</a>   
                </footer>   
            </div>
        </BrowserRouter>
    );
}