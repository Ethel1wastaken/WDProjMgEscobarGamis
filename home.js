const currentAccount = JSON.parse(localStorage.getItem("activeAccount"));

let usernameDisplay = document.getElementById("usernameOutput");

console.log(currentAccount);

usernameDisplay.innerHTML += currentAccount.username;