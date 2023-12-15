import React from 'react';

export function Login() {
    return (
        <main className='container-fluid bg-secondary text-center'>
            <div id="centralLoginBlock">
                <h2>Welcome to Recursive TicTacToe!</h2>
                <p>To learn more about Recursive TicTacToe before logging in, go to the about page.</p>
                <form id="loginForm">
                <input type="text" id="username" className="text-field" placeholder="Username"></input>
                    <input type="password" id="password" className="text-field" placeholder="Password"></input>
                    <p className="error-text" id="loginErrorText">Invalid username or password</p>
                    <span>
                        <input className="rounded-button" type="button" onClick={()=>register()} value="Register"></input>
                        <input className="rounded-button" type="button" onClick={()=>login()} value="Login"></input>
                    </span>
                </form>
            </div>
        </main> 
    );
}
