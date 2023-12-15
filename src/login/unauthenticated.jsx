import React from 'react';

export function Unauthenticated({userName}) {
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
                    <input type="text" id="username" className="text-field" placeholder="Username"/>
                    <input type="password" id="password" className="text-field" placeholder="Password"/>
                    <p className="error-text" id="loginErrorText">Invalid username or password</p>
                    <span>
                        <input className="rounded-button" type="button" onClick={()=>register()} value="Register"/>
                        <input className="rounded-button" type="button" onClick={()=>login()} value="Login"/>
                    </span>
                </form>
            </div>
        </>
    );
}