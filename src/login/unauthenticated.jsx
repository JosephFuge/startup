import React from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState('');

    async function login() {    
        let loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email: userName, password: password}),
          });
    
        if (loginResponse.ok) {
            localStorage.setItem("username", userName);
            props.onLogin(userName);
        } else {
            setDisplayError('Couldn\'t register user - try a different username');
        }
    }
    
    async function register() {
    
        let registerResponse = await fetch('/register', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email: userName, password: password}),
          });
        
        if (registerResponse.ok) {
            localStorage.setItem("username", userName);
            props.onLogin(userName);
        } else {
            setDisplayError('Couldn\'t register user - try a different username');
        }
    }

    return (
        <>
            <div id="centralLoginBlock">
                <h2>Welcome to Recursive TicTacToe!</h2>
                <p>To learn more about Recursive TicTacToe before logging in, go to the about page.</p>
                <form id="loginForm">
                            <input
                        className='text-field'
                        type='text'
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='your@email.com'
                    />
                    <input
                        className='text-field'
                        type='password'
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                    />
                    {/* <input type="text" id="username" className="text-field" placeholder="Username"/>
                    <input type="password" id="password" className="text-field" placeholder="Password"/> */}
                    <p className="error-text" id="loginErrorText">{displayError}</p>
                    <span>
                        <input className="rounded-button" type="button" onClick={()=>register()} value="Register"/>
                        <input className="rounded-button" type="button" onClick={()=>login()} value="Login"/>
                    </span>
                </form>
            </div>
        </>
    );
}