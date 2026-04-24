let currentAccount = JSON.parse(localStorage.getItem("activeAccount"));
let createdAccounts = JSON.parse(localStorage.getItem("accounts"));

//USERNAME DISPLAY
let usernameDisplay = document.getElementById("usernameOutput");

console.log(currentAccount);

if(currentAccount) {
    usernameDisplay.innerHTML += currentAccount.username;
}

else {
    usernameDisplay.innerHTML = "";
}

//DROPDOWN - DISPLAY
function dropdown() {
    accountsDropdown.classList.toggle("show");
}

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

// MOBILE SCREENS
function openNavbar() {
    let mobileDisplay = document.getElementById("navSidebar");
    mobileDisplay.style.width = "100%";
}

function closeNavbar() {
    let mobileDisplay = document.getElementById("navSidebar");
    mobileDisplay.style.width = "0";
}

//EVENT LISTENERS
let accountBtn = document.getElementById("mobileBtn");
let accountDropdown = document.getElementById("mobileAccounts");

accountBtn.addEventListener("click", ()=>{
    mobileAccounts.classList.toggle("display");
})

//MOBILE - DROPDOWN
function mobileDisplayAcc() {
    let popup = document.getElementById("mobileDialog");
    
    if(popup.open) {
        popup.close();
        return;
    }

    popup.innerHTML = "";

    let activeacc = document.createElement("p");
    activeacc.innerHTML = currentAccount.username;

    activeacc.style.fontWeight = "bold";

    popup.appendChild(activeacc);

    for(let i in createdAccounts) {

        if(createdAccounts[i].username != currentAccount.username) {
            let accountButton = document.createElement("button");

            accountButton.textContent += createdAccounts[i].username;
            accountButton.setAttribute("onclick", "switchAccount(this)");

            popup.appendChild(accountButton);
        }
    }

    popup.show();
}