
function login() {
    console.log('login');
    const username = document.getElementById("username").value;
    // TODO: Grab password and use it for authentication
    // const password = document.getElementById("password");

    localStorage.setItem("username", username);
    window.location.href = "game/gameselect.html";
}