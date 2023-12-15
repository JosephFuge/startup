
async function login() {
    const userEmail = document.getElementById("username").value;
    const userPassword = document.getElementById("password").value;

    let loginResponse = await fetch('/login', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({email: userEmail, password: userPassword}),
      });

    if (loginResponse.ok) {
        localStorage.setItem("username", userEmail);
        window.location.href = "/gameselect";
    } else {
        const loginError = document.getElementById('loginErrorText');
        loginError.innerHTML = 'Invalid username or password';
        loginError.style.display = 'block';
    }
}

async function register() {
    const userEmail = document.getElementById("username").value;
    const userPassword = document.getElementById("password").value;

    let registerResponse = await fetch('/register', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({email: userEmail, password: userPassword}),
      });
    
    if (registerResponse.ok) {
        localStorage.setItem("username", userEmail);
        window.location.href = "/gameselect";
    } else {
        const loginError = document.getElementById('loginErrorText')
        loginError.innerHTML = 'Couldn\'t register user - try a different username';
        loginError.style.display = 'block';
    }
}