let accountInfo = JSON.parse(localStorage.getItem("activeAccount"));

let createdAccounts = JSON.parse(localStorage.getItem("accounts"));

//SIDEBAR
let appearance = document.getElementById("design");
let account = document.getElementById("account");

function settingsAppearance() {
    console.log("clicked");
    appearance.classList.add("active");
    account.classList.remove("active");
}

function settingsAccount() {
    console.log("clicked");
    account.classList.add("active");
    appearance.classList.remove("active");
}

//SETTINGS APPEARANCE

//SETTINGS ACCOUNT

let userDisplay = document.getElementById("username");
let mailDisplay = document.getElementById("email");
let passDisplay = document.getElementById("password");

userDisplay.innerHTML += accountInfo.username; 
mailDisplay.innerHTML += accountInfo.email;
passDisplay.innerHTML += accountInfo.password;

//username edits - NOTE: might make all use only two functions using keyword 'this' in the future
let username = document.getElementById("currentUsername");

username.innerHTML += accountInfo.username;

function userEdit() {
    document.getElementById("newUser").setAttribute("class", "open");
}

function userCancel() {
    document.getElementById("newUser").removeAttribute("class");
}

//email edits
let email  = document.getElementById("currentEmail");

email.innerHTML += accountInfo.email;

function mailEdit () {
    document.getElementById("newMail").setAttribute("class", "open");
}

function mailCancel() {
    document.getElementById("newMail").removeAttribute("class", "open");
}

// password edits
let password  = document.getElementById("currentPassword");

password.innerHTML += accountInfo.password;

function passEdit () {
    document.getElementById("newPass").setAttribute("class", "open");
}

function passCancel() {
    document.getElementById("newPass").removeAttribute("class", "open");
}

//Process Inputs

document.getElementById("userName").addEventListener("submit", changeUsername);
document.getElementById("eMail").addEventListener("submit", changeEmail);
document.getElementById("passWord").addEventListener("submit", changePassword);

let updatedUsername = document.getElementById("newUsername").value;
let updatedEmail = document.getElementById("newEmail").value;
let udpatedPassword = document.getElementById("newPassword").value;

function changeUsername(e) {
    e.preventDefault();

    for(let i in createdAccounts) {
        if(createdAccounts[i].username == accountInfo.username) {
            accountInfo.username = updatedUsername;
            createdAccounts[i].username = updatedUsername;

            console.log("Username successfully updated")
        }
    }

    localStorage.setItem("accounts", JSON.stringify(createdAccounts));

    console.log("Information stored in local storage");
}

function changeEmail(e) {
    e.preventDefault();

}

function changePassword(e) {
    e.preventDefault();

}