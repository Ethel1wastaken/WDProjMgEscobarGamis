let currentAccount = JSON.parse(localStorage.getItem("activeAccount"));
let createdAccounts = JSON.parse(localStorage.getItem("accounts"));

//USERNAME DISPLAY
let usernameDisplay = document.getElementById("usernameOutput");

console.log(currentAccount);

usernameDisplay.innerHTML += currentAccount.username;

//DROPDOWN- SWITCH ACCOUNTS
function displayAcc() {
    let display = document.getElementById("accountsDisplay");
    
    if(display.open) {
        display.close();
        return;
    }

    display.innerHTML = "";

    let currentDisplay = document.createElement("p");
    currentDisplay.textContent += currentAccount.username;

    display.appendChild(currentDisplay);

    for(let i in createdAccounts) {

        if(createdAccounts[i].username != currentAccount.username) {
            let accountButton = document.createElement("button");

            accountButton.textContent += createdAccounts[i].username;
            accountButton.setAttribute("onclick", "switchAccount(this)");

            display.appendChild(accountButton);
        }
    }

    display.show();
}

//SWITCH ACCOUNTS
function switchAccount(account2) {
    let nextAccount = account2.innerHTML;

    for(let i in createdAccounts) {
        if(createdAccounts[i].username == nextAccount) {
            currentAccount = createdAccounts[i];

            localStorage.setItem("activeAccount", JSON.stringify(currentAccount));

            location.reload();
        }
    }
}

//DROPDOWN- LOGOUT
function logOut() {
    localStorage.removeItem("activeAccount");
}