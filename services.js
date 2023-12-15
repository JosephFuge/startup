function setName() {
    document.querySelector("#usernameBlock > p").innerHTML = "Logged in as:";
    document.getElementById("userNameText").innerHTML = localStorage.getItem("username");
}

function logout() {
    fetch(`/api/auth/logout`, {
    method: 'delete',
    });
}