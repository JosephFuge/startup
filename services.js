function setName() {
    document.querySelector("#usernameBlock > p").innerHTML = "Logged in as:";
    document.getElementById("userNameText").innerHTML = localStorage.getItem("username");
}
