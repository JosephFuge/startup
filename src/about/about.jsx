 import React from 'react';

 export function About() {
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect(() => {

        fetch('https://dog.ceo/api/breeds/image/random')
          .then((response) => response.json())
          .then((data) => {
            console.log(data['message']);
            setImageUrl(data['message']);
          })
          .catch();
      }, []);

    let imgEl = '';

    if (imageUrl) {
        imgEl = <img src={imageUrl} width="150" height="150" alt='dog photo'/> 
    }

    return (
        <main className='container-fluid bg-secondary text-center'>
            <div id="aboutContent">
                <h1>About Recursive TicTacToe</h1>
                <p>Recursive TicTacToe takes your traditional game of TicTacToe and adds new layers to it - literally.
                    <br /> 
                    Imagine taking your traditional TicTacToe board, and draw another TicTacToe board in each of the squares.<br/>
                    In order to mark a square in your original board, you have to win the tictactoe game within that square.
                </p>
                <br/>
                <p>
                    To add onto the fun, you can also send emoji reactions to the other user during the game.<br/>
                    Cheer at your triumphs, sob at your slip-ups, and most importantly, have fun!<br/>
                </p>
                <img src="/metaltictactoe.jpg" width="150" height="150"/>
                {imgEl}
                <br/>
            </div>
        </ main>
    );
 }